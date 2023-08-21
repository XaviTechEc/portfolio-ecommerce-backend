import { StatusValue } from 'src/core/enums/orders/status-value.enum';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
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
    default: StatusValue.processing,
  })
  statusValue: StatusValue;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.orderStatus)
  shopOrder: ShopOrder[];
}
