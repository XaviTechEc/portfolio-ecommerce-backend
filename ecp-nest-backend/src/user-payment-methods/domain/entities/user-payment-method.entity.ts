import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IUserPaymentMethod extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  provider: string;
  accountNumber: string;
  expiryDate?: Date;
  isDefault?: boolean;
  user: IUser;
  paymentMethod: IPaymentMethod;
}
