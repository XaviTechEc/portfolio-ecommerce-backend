import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from './PaymentMethod';
import { User } from './User';
import { ShopOrder } from './ShopOrder';

@Index('user_payment_method_pkey', ['id'], { unique: true })
@Entity('user_payment_method', { schema: 'public' })
export class UserPaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'provider' })
  provider: string;

  @Column('character varying', { name: 'account_number' })
  accountNumber: string;

  @Column('timestamptz', {
    name: 'expiry_date',
    nullable: true,
  })
  expiryDate: Date | null;

  @Column('boolean', {
    name: 'is_default',
    default: true,
  })
  isDefault: boolean;

  // Relations
  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.userPaymentMethodId)
  @JoinColumn([{ name: 'id', referencedColumnName: 'user_payment_method_id' }])
  shopOrder: ShopOrder;

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
