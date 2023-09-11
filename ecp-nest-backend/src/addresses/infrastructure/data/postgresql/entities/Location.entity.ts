import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from './Address.entity';
import { ShopOrderLocation } from './ShopOrderLocation.entity';

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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToOne(() => Address, (address) => address.location)
  address: Address;

  @OneToMany(
    () => ShopOrderLocation,
    (shopOrderLocation) => shopOrderLocation.location,
  )
  shopOrderLocation: ShopOrderLocation[];
}