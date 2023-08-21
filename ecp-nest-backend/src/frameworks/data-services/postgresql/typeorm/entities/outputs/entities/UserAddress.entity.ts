import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User.entity';
import { Address } from './Address.entity';

@Entity('user_address')
export class UserAddress {
  @PrimaryColumn('character varying', { name: 'user_id' })
  userId: string;

  @PrimaryColumn('character varying', { name: 'address_id' })
  addressId: string;

  @Column('boolean', {
    name: 'is_default',
    nullable: true,
  })
  isDefault: boolean | null;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address;
}
