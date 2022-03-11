import { COMPLAINT_REPO } from '@config/constants';
import { Provider } from '@nestjs/common';
import { ComplaintServiceImpl } from './complaint.service';

export const ComplaintServiceProvider: Provider = {
  provide: COMPLAINT_REPO,
  useClass: ComplaintServiceImpl,
};
