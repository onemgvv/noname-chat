import {
  USER_SERVICE,
  PAYMENT_SERVICE,
  CLOUDPAYMENTS_SERVICE,
  ROLE_REPO,
} from '@config/constants';
import { IPaymentService } from '@domain/admin/payment/interface/payment-service.interface';
import { IRoleRepository } from '@domain/app/user/interface/role-repo.interface';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { RolesList } from '@enums/roles.enum';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { User } from '@persistence/app/user/user.entity';
import { Server, Socket } from 'socket.io';
import { Helper } from './app.helper';
import { ICloudPaymentsService } from './cloudpayments/interface/cp-service.interface';
import { AppGateway } from './gateways/app.gateway';
import { NotificationDto } from './gateways/dto/notification.dto';

const UserService = () => Inject(USER_SERVICE);
const RoleRepo = () => Inject(ROLE_REPO);
const PaymentService = () => Inject(PAYMENT_SERVICE);
const CloudpaymentService = () => Inject(CLOUDPAYMENTS_SERVICE);

interface GivePremium {
  userId: number;
  period: number;
}

@Injectable()
export class AdminService {
  private server: Server;

  private logger: Logger = new Logger('AdminService');

  constructor(
    @UserService() private userService: IUserService,
    @RoleRepo() private roleRepository: IRoleRepository,
    @PaymentService() private paymentService: IPaymentService,
    @CloudpaymentService() private cloudPaymentService: ICloudPaymentsService,
    appGateway: AppGateway,
  ) {
    this.server = appGateway.server;
  }

  @SubscribeMessage('CLIENT:GIVE_PREMIUM')
  async givePremium(client: Socket, data: GivePremium) {
    this.logger.log('data: ', data);
    const user: User = await this.userService.findUser('id', data.userId);
    const expiresIn = Helper.calculateDate(data.period);

    user.premium = expiresIn;
    if (!user.roles.some((role) => role.name === RolesList.PREMIUM)) {
      const premium = await this.roleRepository.getByName(RolesList.PREMIUM);
      user.roles.push(premium);
    }
    await user.save();

    return this.server.to(client.id).emit('SERVER:PREMIUM_GIVED', { user });
  }

  @SubscribeMessage('CLIENT:SEND_NOTIFY')
  async sendNotify(client: Socket, notificationDto: NotificationDto) {
    const { userId } = notificationDto;
    console.log('client data: ', client.data);
    console.log('notify: ', notificationDto);
    return this.server
      .to(`messages/${userId}`)
      .emit('SERVER:NOTIFY_SENDED', notificationDto);
  }

  @SubscribeMessage('CLIENT:CHECK_USER_PREMIUM')
  async checkPremium(client: Socket, user: User) {
    if (!user || !user.premium) {
      return this.server
        .to(`messages/${user.id}`)
        .emit('SERVER:PREMIUM_CHECKED', { status: false });
    }

    const today: number = Date.now();
    const premium: number = user.premium && new Date(user.premium).getTime();

    if (user.roles.some((role) => role.name === RolesList.ADMIN)) {
      return this.server
        .to(`messages/${user.id}`)
        .emit('SERVER:PREMIUM_CHECKED', {
          status: true,
          premium: user.premium,
        });
    }

    if (!user.premium || today > premium) {
      const result = await this.cloudPaymentService.renewSubscription(
        user.email,
      );
      if (result.status)
        return this.server
          .to(`messages/${user.id}`)
          .emit('SERVER:PREMIUM_CHECKED', {
            status: true,
            premium: result.premium,
          });

      user.premium = null;
      user.roles.filter((role) => role.name !== RolesList.PREMIUM);

      user.save();
      return this.server
        .to(`messages/${user.id}`)
        .emit('SERVER:PREMIUM_CHECKED', { status: false });
    }
  }
}
