import { StatusValue } from 'src/order-status/domain/enums/status-value.enum';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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
