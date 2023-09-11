import { PaymentMethod } from 'src/payment-methods/infrastructure/data/postgresql/entities/PaymentMethod.entity';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Index('user_payment_method_pkey', ['id'], { unique: true })
@Entity('user_payment_method')
export class UserPaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'provider' })
  provider: string;

  @Column('character varying', { name: 'account_number' })
  accountNumber: string;

  @Column('timestamptz', {
    name: 'expiry_date',
    nullable: true,
  })
  expiryDate?: Date;

  @Column('boolean', {
    name: 'is_default',
    default: true,
  })
  isDefault?: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.userPaymentMethod)
  shopOrder: ShopOrder[];

  @ManyToOne(() => User, (user) => user.userPaymentMethod)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(
    () => PaymentMethod,
    (paymentMethod) => paymentMethod.userPaymentMethod,
  )
  @JoinColumn([{ name: 'payment_method_id', referencedColumnName: 'id' }])
  paymentMethod: PaymentMethod;
}
