import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address.entity';

@Index('country_code_idx', ['code'], { unique: true })
@Index('country_code_key', ['code'], { unique: true })
@Index('country_pkey', ['id'], { unique: true })
@Entity('country')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'code', unique: true })
  code: string;

  @Column('character varying', { name: 'long_name' })
  longName: string;

  // Relations
  @OneToMany(() => Address, (address) => address.country)
  addresses: Address[];
}
