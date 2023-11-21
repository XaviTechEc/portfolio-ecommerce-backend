import { Location } from 'src/addresses/infrastructure/data/postgresql/entities';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shop_order_location')
export class ShopOrderLocation extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'shop_order_id' })
  shopOrderId: string;

  @PrimaryColumn('character varying', { name: 'location_id' })
  locationId: string;

  // Relations
  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.shopOrderLocation)
  @JoinColumn([{ name: 'shop_order_id', referencedColumnName: 'id' }])
  shopOrder: ShopOrder;

  @ManyToOne(() => Location, (location) => location.shopOrderLocation)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Location;
}
