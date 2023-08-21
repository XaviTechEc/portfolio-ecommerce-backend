import { Column, Entity, Index, OneToMany } from 'typeorm';

import { PaymentMethods } from 'src/core/enums';
import { UserPaymentMethod } from './UserPaymentMethod.entity';

@Index('payment_method_pkey', ['id'], { unique: true })
@Entity('payment_method')
export class PaymentMethod {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column({
    type: 'enum',
    name: 'value',
    enum: PaymentMethods,
    default: PaymentMethods.creditCard,
  })
  value: PaymentMethods;

  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.paymentMethod,
  )
  userPaymentMethod: UserPaymentMethod[];
}
