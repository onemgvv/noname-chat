import { Tariff } from '@persistence/admin/tariff/tariff.entity';
import { User } from '@persistence/app/user/user.entity';

export interface RequestDataInterface {
  tariff?: Tariff;
  user?: User;
  startDate?: Date;
}
