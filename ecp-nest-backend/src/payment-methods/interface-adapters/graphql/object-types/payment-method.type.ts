import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { UserPaymentMethodType } from 'src/user-payment-methods/interface-adapters/graphql/object-types/user-payment-method.entity.type';
import { PaymentMethodEnum } from '../../../domain/enums/payment-methods.enum';

@ObjectType()
export class PaymentMethodType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => PaymentMethodEnum)
  value: PaymentMethodEnum;

  // Relations
  @Field(() => [UserPaymentMethodType])
  userPaymentMethods: UserPaymentMethodType[];
}
