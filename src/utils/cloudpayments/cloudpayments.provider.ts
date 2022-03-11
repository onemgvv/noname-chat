import { CLOUDPAYMENTS_SERVICE } from '@config/constants';
import { CloudPaymentsService } from './cloudpayments.service';
import { Provider } from '@nestjs/common';

export const CloudpaymentsServiceProvider: Provider = {
  provide: CLOUDPAYMENTS_SERVICE,
  useClass: CloudPaymentsService,
};
