import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PaymentMethodEnum } from '../enums/payment-methods.enum';

export class IPaymentMethod extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  value: PaymentMethodEnum;
}
