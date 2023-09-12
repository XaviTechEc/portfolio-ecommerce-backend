import { Location } from 'src/addresses/infrastructure/data/postgresql/entities';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('shop_order_location')
export class ShopOrderLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'shop_order_id' })
  shopOrderId: string;

  @PrimaryColumn('character varying', { name: 'location_id' })
  locationId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.shopOrderLocation)
  @JoinColumn([{ name: 'shop_order_id', referencedColumnName: 'id' }])
  shopOrder: ShopOrder;

  @ManyToOne(() => Location, (location) => location.shopOrderLocation)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Location;
}
