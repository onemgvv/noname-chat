import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Get,
  Post,
  UseGuards,
  Param,
  Req,
  Res,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CustomAuthGuard } from '@common/guards/custom-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@persistence/app/user/user.entity';
import { CreatePaymentDto } from './dto/create.dto';
import { Request, Response } from 'express';
import { ResponseCodes } from 'cloudpayments';
import { RequestDataInterface } from '@utils/cloudpayments/interface/request-data.interface';
import { IUserService } from '@domain/app/user/interface/user-service.inerface';
import { IPaymentService } from '@domain/admin/payment/interface/payment-service.interface';
import { ICloudPaymentsService } from '@utils/cloudpayments/interface/cp-service.interface';
import {
  PAYMENT_SERVICE,
  USER_SERVICE,
  CLOUDPAYMENTS_SERVICE,
} from '@common/config/constants';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const UserService = () => Inject(USER_SERVICE);
const PaymentService = () => Inject(PAYMENT_SERVICE);
const CloudPaymentsService = () => Inject(CLOUDPAYMENTS_SERVICE);

@ApiTags('Admin payments')
@Controller('payment')
export class PaymentController {
  constructor(
    @PaymentService() private paymentService: IPaymentService,
    @UserService() private userService: IUserService,
    @CloudPaymentsService() private cloudPaymentsService: ICloudPaymentsService,
  ) {}

  @ApiOperation({ summary: 'Create new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiBody({ type: CreatePaymentDto })
  @Post()
  @HttpCode(201)
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.create(dto);
  }

  @ApiOperation({ summary: 'Get payment by account id' })
  @ApiResponse({ status: 200, description: 'Payment successfully founded' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @ApiParam({
    name: 'accountId',
    type: String,
    description: 'account id from subscribtion',
  })
  @Get('/accountId/:accountId')
  @HttpCode(200)
  async getByAccountId(@Param('accountId') accountId: string) {
    return this.paymentService.getByAccountId(accountId);
  }

  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({ status: 200, description: 'Payment successfully founded' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'payment id',
  })
  @Get('/id/:id')
  @HttpCode(200)
  async getById(@Param('id') id: number) {
    return this.paymentService.getById(id);
  }

  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Payments successfully founded' })
  @ApiResponse({ status: 404, description: 'Payments not found' })
  @Get()
  @HttpCode(200)
  async listAll() {
    const payment = await this.paymentService.listPayments();
    if (!payment || payment.length === 0)
      throw new NotFoundException('Данные о платежах не найдены в системе');

    return payment;
  }

  @ApiOperation({ summary: 'Unsubscribe user' })
  @ApiResponse({
    status: 200,
    description: 'Subscribtion successfully canceled',
  })
  @ApiResponse({ status: 404, description: 'Subscribtion not found' })
  @Delete('subscribtion')
  @HttpCode(200)
  @UseGuards(CustomAuthGuard)
  async unsubscribe(@CurrentUser() user: User) {
    const id = await this.cloudPaymentsService.findByAccountId(user.email);
    return this.cloudPaymentsService.unsubscribe(id);
  }

  @ApiOperation({ summary: 'Cancel subscribtion' })
  @ApiResponse({
    status: 200,
    description: 'Subscribtion successfully canceled',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, description: 'user id' })
  @Delete('subscription/:id')
  @HttpCode(200)
  @UseGuards(CustomAuthGuard)
  async cancelSub(@Param('id') userId: number) {
    const user = await this.userService.findUser('id', userId);
    if (!user) throw new NotFoundException('User not found in system');

    const id = await this.cloudPaymentsService.findByAccountId(user.email);
    return this.cloudPaymentsService.unsubscribe(id);
  }

  @Post('pay')
  @HttpCode(200)
  async payment(@Req() request: Request, @Res() response: Response) {
    console.log('[PAYMENT PAY NOTIFY]');
    const result = await this.cloudPaymentsService.handlePayNotification(
      request,
    );
    const { tariff, startDate, user }: RequestDataInterface = JSON.parse(
      result.request.Data,
    );

    if (result.response.code === ResponseCodes.SUCCESS) {
      const data: CreatePaymentDto = {
        accountId: result.request.AccountId,
        tariffId: tariff.id,
        startDate,
        invoiceId: result.request.InvoiceId,
        subscribtionId: result.request.SubscriptionId,
      };
      console.log('[PAYMENT INSTANCE]: \n', data);

      await this.paymentService.create(data);
    }

    if (result.response.code === ResponseCodes.INVALID_ACCOUNT_ID) {
      // ошибка аккаунта
      console.log('[ACCOUNT ID ERROR]|[CODE]: ', result.response.code);
      console.log('[ACCOUNT ID ERROR]|[GET ID]: ', result.request.AccountId);
      console.log('[ACCOUNT ID ERROR]|[NEED ID]: ', user.email);
    }

    if (result.response.code === ResponseCodes.INVALID_AMOUNT) {
      // ошибка оплаты
      console.log('[ACCOUNT ID ERROR]|[CODE]: ', result.response.code);
      console.log('[ACCOUNT ID ERROR]|[GET AMOUNT]: ', result.request.Amount);
      console.log('[ACCOUNT ID ERROR]|[NEED AMOUNT 1]: ', tariff.price);
      console.log(
        '[ACCOUNT ID ERROR]|[NEED AMOUNT 2]: ',
        tariff.recurrentPrice,
      );
    }

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(result));
  }
}
