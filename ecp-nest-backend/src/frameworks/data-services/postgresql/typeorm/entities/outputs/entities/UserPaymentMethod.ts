import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentMethod } from './PaymentMethod';
import { User } from './User';

@Index('user_payment_method_pkey', ['id'], { unique: true })
@Entity('user_payment_method', { schema: 'public' })
export class UserPaymentMethod {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'provider' })
  provider: string;

  @Column('character varying', { name: 'account_number' })
  accountNumber: string;

  @Column('timestamp without time zone', {
    name: 'expiry_date',
    nullable: true,
  })
  expiryDate: Date | null;

  @Column('boolean', {
    name: 'is_default',
    nullable: true,
    default: () => 'true',
  })
  isDefault: boolean | null;

  @ManyToOne(() => User, (user) => user.userPaymentMethod)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(
    () => PaymentMethod,
    (paymentMethod) => paymentMethod.userPaymentMethods,
  )
  @JoinColumn([{ name: 'payment_method_id', referencedColumnName: 'id' }])
  paymentMethod: PaymentMethod;
}
