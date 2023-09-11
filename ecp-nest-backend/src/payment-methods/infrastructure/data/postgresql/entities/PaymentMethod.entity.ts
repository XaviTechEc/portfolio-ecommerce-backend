import { UserPaymentMethod } from 'src/user-payment-methods/infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { PaymentMethod as PaymentMth } from '../../../../domain/enums/payment-methods.enum';

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
