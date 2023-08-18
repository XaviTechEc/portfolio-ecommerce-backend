import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Country } from './Country';
import { UserAddress } from './UserAddress';

@Index('address_pkey', ['id'], { unique: true })
@Entity('address', { schema: 'public' })
export class Address {
  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('integer', { name: 'unit_number', nullable: true })
  unitNumber: number | null;

  @Column('character varying', { name: 'street_number', nullable: true })
  streetNumber: string | null;

  @Column('character varying', { name: 'address_line1' })
  addressLine1: string;

  @Column('character varying', { name: 'address_line2' })
  addressLine2: string;

  @Column('character varying', { name: 'city' })
  city: string;

  @Column('character varying', { name: 'region' })
  region: string;

  @Column('character varying', { name: 'postal_code' })
  postalCode: string;

  @Column('character varying', {
    name: 'reference',
    nullable: true,
    default: () => "'no-ref'",
  })
  reference: string | null;

  @Column('character varying', { name: 'location_id', nullable: true })
  locationId: string | null;

  @ManyToOne(() => Country, (country) => country.addresses)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;

  @OneToMany(() => UserAddress, (userAddress) => userAddress.address)
  userAddresses: UserAddress[];
}
