import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IUserPaymentMethod {
  id: string;
  provider: string;
  accountNumber: string;
  expiryDate?: Date;
  isDefault?: boolean;
  user: IUser;
  paymentMethod: IPaymentMethod;
}
