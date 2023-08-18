import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address';
import { ShopOrder } from './ShopOrder';

@Index('location_pkey', ['id'], { unique: true })
@Index('location_lat_location_lng_idx', {})
@Entity('location', { schema: 'public' })
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { name: 'lat' })
  lat: number;

  @Column('decimal', { name: 'lng' })
  lng: number;

  @OneToOne(() => Address, (address) => address.location)
  @JoinColumn([{ name: 'id', referencedColumnName: 'location_id' }])
  address: Address;

  @OneToOne(() => ShopOrder, (shopOrder) => shopOrder.location)
  @JoinColumn([{ name: 'id', referencedColumnName: 'last_location_id' }])
  shopOrder: ShopOrder;
}
