import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Address } from './Address';
import { Location } from './Location';
import { OrderLine } from './OrderLine';
import { ShippingMethod } from './ShippingMethod';
import { OrderStatus } from './OrderStatus';
import { UserPaymentMethod } from './UserPaymentMethod';

@Index('shop_order_pkey', ['id'], { unique: true })
@Index('shop_order_user_id_idx', ['user_id'], { unique: true })
@Entity({ name: 'shop_order', schema: 'public' })
export class ShopOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varying character', { name: 'user_id' })
  userId: string;

  @Column('varying character', { name: 'user_payment_method_id' })
  userPaymentMethodId: string;

  @Column('varying character', { name: 'shipping_address_id' })
  shippingAddressId: string;

  @Column('varying character', { name: 'shipping_method_id' })
  shippingMethodId: string;

  @Column('real', { name: 'order_total' })
  orderTotal: number;

  @Column('varying character', { name: 'order_status_id' })
  orderStatusId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  @Column('varying character', { name: 'last_location_id', nullable: true })
  lastLocationId: string | null;

  // Relations
  @OneToMany(() => OrderLine, (orderLine) => orderLine.shopOrder)
  orderLine: OrderLine[];

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.shopOrder)
  @JoinColumn([{ name: 'shipping_method_id', referencedColumnName: 'id' }])
  shippingMethod: ShippingMethod;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.shopOrder)
  @JoinColumn([{ name: 'order_status_id', referencedColumnName: 'id' }])
  orderStatus: OrderStatus;

  @OneToOne(() => Location, (location) => location.shopOrder)
  @JoinColumn([{ name: 'last_location_id', referencedColumnName: 'id' }])
  location: Location;

  @ManyToOne(() => User, (user) => user.shopOrder)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.shopOrder,
  )
  userPaymentMethod: UserPaymentMethod[];

  @ManyToOne(() => Address, (address) => address.shopOrder)
  @JoinColumn([{ name: 'shipping_address_id', referencedColumnName: 'id' }])
  address: Address;
}
