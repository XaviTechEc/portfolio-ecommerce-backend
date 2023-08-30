import { IUser } from '../users/user.entity';

export class IUserPaymentMethod {
  id: string;
  provider: string;
  accountNumber: string;
  expiryDate?: Date;
  isDefault?: boolean;
  user: IUser;
}
