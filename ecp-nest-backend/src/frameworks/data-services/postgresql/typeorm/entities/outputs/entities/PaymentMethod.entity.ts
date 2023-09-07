import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { PaymentMethod as PaymentMth } from 'src/core/enums';
import { UserPaymentMethod } from './UserPaymentMethod.entity';

@Index('payment_method_pkey', ['id'], { unique: true })
@Entity('payment_method')
export class PaymentMethod {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column({
    type: 'enum',
    name: 'value',
    enum: PaymentMth,
    default: PaymentMth.CREDIT_CARD,
  })
  value: PaymentMth;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.paymentMethod,
  )
  userPaymentMethod: UserPaymentMethod[];
}
