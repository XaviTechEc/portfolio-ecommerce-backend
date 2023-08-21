import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from './Address.entity';
import { ShopOrder } from './ShopOrder.entity';

@Index('location_pkey', ['id'], { unique: true })
@Index('location_lat_lng_idx', ['lat', 'lng'], {})
@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { name: 'lat' })
  lat: number;

  @Column('decimal', { name: 'lng' })
  lng: number;

  @OneToOne(() => Address, (address) => address.location)
  address: Address;

  @OneToOne(() => ShopOrder, (shopOrder) => shopOrder.location)
  shopOrder: ShopOrder;
}
