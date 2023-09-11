import { StatusValue } from 'src/core/enums/orders/status-value.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopOrder } from './ShopOrder.entity';

@Index('order_status_pkey', ['id'], { unique: true })
@Entity('order_status')
export class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    name: 'status_value',
    enum: StatusValue,
    default: StatusValue.IN_PROGRESS,
  })
  statusValue: StatusValue;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.orderStatus)
  shopOrder: ShopOrder[];
}
