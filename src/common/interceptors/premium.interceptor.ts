import { CLOUDPAYMENTS_SERVICE } from '@config/constants';
import { RolesList } from '@enums/roles.enum';
import { User } from '@persistence/app/user/user.entity';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICloudPaymentsService } from '@utils/cloudpayments/interface/cp-service.interface';

const CloudpaymentsRepo = () => Inject(CLOUDPAYMENTS_SERVICE);

@Injectable()
export class CheckPremiumInterceptor implements NestInterceptor {
  constructor(
    @CloudpaymentsRepo() private cloudpaymentService: ICloudPaymentsService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const user: User = await request.user;
    if (!user) return next.handle();

    const today: number = Date.now();
    const premium: number = user.premium && user.premium.getTime();

    if (
      user.roles.some(
        (role) =>
          role.name === RolesList.ADMIN ||
          user.roles.some((r) => r.name === RolesList.MODERATOR),
      )
    ) {
      const newDate: number = today + 31536000000;
      user.premium = new Date(newDate);
      user.save();
    }

    if (!user.premium || today > premium) {
      const result = await this.cloudpaymentService.renewSubscription(
        user.email,
      );
      if (result.status) return next.handle();

      user.premium = null;
      user.roles.filter((r) => r.name !== RolesList.PREMIUM);
      user.save();
      throw new UnauthorizedException(
        'Доступ к этой функции имеют только премиум пользователи!',
      );
    }

    return next.handle();
  }
}
