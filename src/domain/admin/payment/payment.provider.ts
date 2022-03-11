import { PAYMENT_SERVICE } from '@config/constants';
import { Provider } from '@nestjs/common';
import { PaymentServiceImpl } from './payment.service';

export const PaymentServiceProvider: Provider = {
  provide: PAYMENT_SERVICE,
  useClass: PaymentServiceImpl,
};
