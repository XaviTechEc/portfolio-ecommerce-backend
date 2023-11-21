import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrderLocation } from 'src/shop-order-locations/infrastructure/data/postgresql/entities/ShopOrderLocation.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address.entity';

@Index('location_pkey', ['id'], { unique: true })
@Index('location_lat_lng_idx', ['lat', 'lng'], {})
@Entity('location')
export class Location extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { name: 'lat' })
  lat: number;

  @Column('decimal', { name: 'lng' })
  lng: number;

  // Relations
  @OneToOne(() => Address, (address) => address.location)
  address: Address;

  @OneToMany(
    () => ShopOrderLocation,
    (shopOrderLocation) => shopOrderLocation.location,
  )
  shopOrderLocation: ShopOrderLocation[];
}
