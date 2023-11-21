import { Address } from 'src/addresses/infrastructure/data/postgresql/entities';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_address')
export class UserAddress extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('character varying', { name: 'address_id' })
  addressId: string;

  @Column('boolean', {
    name: 'is_default',
    nullable: true,
  })
  isDefault?: boolean;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address;
}
