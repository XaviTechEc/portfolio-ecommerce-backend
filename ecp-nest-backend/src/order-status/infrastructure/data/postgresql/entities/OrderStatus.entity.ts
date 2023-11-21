import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { StatusValue } from 'src/order-status/domain/enums/status-value.enum';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('order_status_pkey', ['id'], { unique: true })
@Entity('order_status')
export class OrderStatus extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    name: 'status_value',
    enum: StatusValue,
    default: StatusValue.IN_PROGRESS,
  })
  statusValue: StatusValue;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.orderStatus)
  shopOrder: ShopOrder[];
}
