import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Address } from './Address';
import { User } from './User';

@Entity('user_address', { schema: 'public' })
export class UserAddress {
  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'address_id' })
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
