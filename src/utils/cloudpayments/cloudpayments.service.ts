import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import {
  ClientApi,
  ClientService,
  NotificationHandlers,
  TaxationSystem,
  SubscriptionsListGetResponse,
  ClientResponse,
  PayNotification,
  ResponseCodes,
  SubscriptionResponse,
} from 'cloudpayments';
import { Request } from 'express';
import { Payment } from '@persistence/admin/payment/payment.entity';
import { USER_REPO } from '@config/constants';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { User } from '@persistence/app/user/user.entity';
import { ICloudPaymentsService } from './interface/cp-service.interface';

const UserRepo = () => Inject(USER_REPO);

@Injectable()
export class CloudPaymentsService implements ICloudPaymentsService {
  private client: ClientService;

  public handlers: NotificationHandlers;

  private receiptApi: ClientApi;

  constructor(@UserRepo() private usersService: IUserService) {
    this.client = new ClientService({
      privateKey: process.env.CLOUDPAYMENTS_PRIVATE_KEY,
      publicId: process.env.CLOUDPAYMENTS_PUBLIC_ID,
      org: {
        taxationSystem: TaxationSystem.GENERAL,
        inn: Number(process.env.CLOUDPAYMENTS_INN),
      },
    });

    this.handlers = this.client.getNotificationHandlers();
    this.receiptApi = this.client.getClientApi();
  }

  async find(subscribtion: Payment): Promise<string> {
    const paymentDto = {
      AccountId: subscribtion.accountId,
      InvoiceId: subscribtion.invoiceId,
    };

    const subDto = {
      ...paymentDto,
      Id: subscribtion.subscribtionId,
    };
    const data: SubscriptionResponse = await (
      await this.receiptApi.getSubscription(subDto)
    ).getResponse();

    console.log('[SUB by invoice id and accountid and id: ', data);

    if (!data.Model)
      throw new NotFoundException('Нет подписок на этом аккаунте');
    if (data.Success === false)
      throw new NotFoundException('Нет информации о подписке на этом аккаунте');
    if (data.Model.Status !== 'Active')
      throw new NotFoundException('На этом аккаунте нет активных подписок');

    return data.Model.Id;
  }

  async findByAccountId(accountId: string): Promise<string> {
    const data: SubscriptionsListGetResponse = await (
      await this.receiptApi.getSubscriptionsList({ accountId })
    ).getResponse();
    console.log('[by Account ID Sub: ', data);
    if (data.Model.length === 0)
      throw new NotFoundException('Нет подписок на этом аккаунте');
    if (data.Success === false)
      throw new NotFoundException('Нет информации о подписке на этом аккаунте');

    const sIndex = data.Model.length - 1;
    if (data.Model[sIndex].Status !== 'Active')
      throw new NotFoundException('На этом аккаунте нет активных подписок');

    return data.Model[sIndex].Id;
  }

  async unsubscribe(id: string): Promise<{ success: boolean }> {
    const data = await (
      await this.receiptApi.cancelSubscription({ Id: id })
    ).getResponse();
    console.log('[SUb unsub: ', data);
    if (!data.Success)
      throw new BadRequestException('Некорректный id подписки');

    return { success: true };
  }

  async renewSubscription(
    accountId: string,
  ): Promise<{ status: boolean; premium?: Date }> {
    const user: User = await this.usersService.findUser('email', accountId);
    const data: ClientResponse<SubscriptionsListGetResponse> =
      await this.receiptApi.getSubscriptionsList({ accountId });
    const subscriptions = data.getResponse();
    const sIndex = subscriptions.Model.length - 1;

    if (
      !subscriptions.Model[sIndex] ||
      subscriptions.Model[sIndex].Status !== 'Active'
    ) {
      return { status: true };
    }

    const preriod = subscriptions.Model[sIndex].Period;
    await this.usersService.givePremium(user.id, preriod);
    return { status: true, premium: user.premium };
  }

  async handlePayNotification(req: Request) {
    return this.handlers.handlePayRequest(
      req,
      async (request: PayNotification): Promise<ResponseCodes> => {
        const { tariff, user } = JSON.parse(request.Data);
        if (
          tariff.recurrentPrice !== request.Amount ||
          tariff.price !== request.Amount
        ) {
          return ResponseCodes.INVALID_AMOUNT;
        }

        if (user.email !== request.AccountId) {
          return ResponseCodes.INVALID_ACCOUNT_ID;
        }

        return ResponseCodes.SUCCESS;
      },
    );
  }
}
