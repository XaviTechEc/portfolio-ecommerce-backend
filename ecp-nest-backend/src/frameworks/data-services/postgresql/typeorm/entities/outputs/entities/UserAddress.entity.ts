import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Address } from './Address.entity';
import { User } from './User.entity';

@Entity('user_address')
export class UserAddress {
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
