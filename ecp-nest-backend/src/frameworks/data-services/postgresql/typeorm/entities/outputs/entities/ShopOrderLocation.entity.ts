import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './Location.entity';
import { ShopOrder } from './ShopOrder.entity';

@Entity('shop_order_location')
export class ShopOrderLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'shop_order_id' })
  shopOrderId: string;

  @PrimaryColumn('character varying', { name: 'location_id' })
  locationId: string;

  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.shopOrderLocation)
  @JoinColumn([{ name: 'shop_order_id', referencedColumnName: 'id' }])
  shopOrder: ShopOrder;

  @ManyToOne(() => Location, (location) => location.shopOrderLocation)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Location;
}
