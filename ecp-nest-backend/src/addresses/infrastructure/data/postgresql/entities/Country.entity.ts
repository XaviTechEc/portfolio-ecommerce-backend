import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './Address.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@Index('country_code_idx', ['code'], { unique: true })
@Index('country_code_key', ['code'], { unique: true })
@Index('country_pkey', ['id'], { unique: true })
@Entity('country')
export class Country extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
