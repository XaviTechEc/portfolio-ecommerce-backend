import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import { UserAddress } from 'src/user-addresses/infrastructure/data/postgresql/entities/UserAddress.entity';
import { Country } from './Country.entity';
import { Location } from './Location.entity';

@Index('address_pkey', ['id'], { unique: true })
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { name: 'unit_number', nullable: true })
  unitNumber?: number;

  @Column('character varying', { name: 'street_number', nullable: true })
  streetNumber?: string;

  @Column('character varying', { name: 'address_line1' })
  addressLine1: string;

  @Column('character varying', { name: 'address_line2', nullable: true })
  addressLine2?: string;

  @Column('character varying', { name: 'city' })
  city: string;

  @Column('character varying', { name: 'region', nullable: true })
  region?: string;

  @Column('character varying', { name: 'postal_code' })
  postalCode: string;

  @Column('character varying', {
    name: 'reference',
    nullable: true,
    default: 'no-ref',
  })
  reference?: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(() => Country, (country) => country.addresses)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToOne(() => Location, (location) => location.address)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location?: Location;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: UserAddress[];

  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.address)
  shopOrder: ShopOrder[];
}
