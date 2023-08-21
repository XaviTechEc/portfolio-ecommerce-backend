import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './Country.entity';
import { UserAddress } from './UserAddress.entity';
import { ShopOrder } from './ShopOrder.entity';
import { Location } from './Location.entity';

@Index('address_pkey', ['id'], { unique: true })
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer', { name: 'unit_number', nullable: true })
  unitNumber: number | null;

  @Column('character varying', { name: 'street_number', nullable: true })
  streetNumber: string | null;

  @Column('character varying', { name: 'address_line1' })
  addressLine1: string;

  @Column('character varying', { name: 'address_line2', nullable: true })
  addressLine2: string | null;

  @Column('character varying', { name: 'city' })
  city: string;

  @Column('character varying', { name: 'region' })
  region: string;

  @Column('character varying', { name: 'postal_code' })
  postalCode: string;

  @Column('character varying', { name: 'country_id' })
  countryId: string;

  @Column('character varying', {
    name: 'reference',
    nullable: true,
    default: 'no-ref',
  })
  reference: string | null;

  @Column('character varying', { name: 'location_id', nullable: true })
  locationId: string | null;

  // Relations
  @ManyToOne(() => Country, (country) => country.addresses)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToOne(() => Location, (location) => location.address)
  @JoinColumn([{ name: 'location_id', referencedColumnName: 'id' }])
  location: Location;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: UserAddress[];

  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.address)
  shopOrder: ShopOrder[];
}
