import { UserPaymentMethod } from 'src/user-payment-methods/infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PaymentMethodEnum as PaymentMth } from '../../../../domain/enums/payment-methods.enum';

@Index('payment_method_pkey', ['id'], { unique: true })
@Entity('payment_method')
export class PaymentMethod extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column({
    type: 'enum',
    name: 'value',
    enum: PaymentMth,
    default: PaymentMth.CREDIT_CARD,
  })
  value: PaymentMth;

  // Relations
  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.paymentMethod,
  )
  userPaymentMethod: UserPaymentMethod[];
}
