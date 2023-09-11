import { Address } from 'src/addresses/infrastructure/data/postgresql/entities';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_address')
export class UserAddress {
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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.userAddress)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Address, (address) => address.userAddresses)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address;
}
