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
import { User } from './User.entity';

import { Location } from './Location.entity';
import { OrderLine } from './OrderLine.entity';
import { ShippingMethod } from './ShippingMethod.entity';
import { OrderStatus } from './OrderStatus.entity';
import { Address } from './Address.entity';
import { UserPaymentMethod } from './UserPaymentMethod.entity';

@Index('shop_order_pkey', ['id'], { unique: true })
@Entity('shop_order')
export class ShopOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'user_payment_method_id' })
  userPaymentMethodId: string;

  @Column('character varying', { name: 'shipping_address_id' })
  shippingAddressId: string;

  @Column('character varying', { name: 'shipping_method_id' })
  shippingMethodId: string;

  @Column('real', { name: 'order_total' })
  orderTotal: number;

  @Column('character varying', { name: 'order_status_id' })
  orderStatusId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date | null;

  @Column('character varying', { name: 'last_location_id', nullable: true })
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

  @ManyToOne(
    () => UserPaymentMethod,
    (userPaymentMethod) => userPaymentMethod.shopOrder,
  )
  @JoinColumn([{ name: 'user_payment_method_id', referencedColumnName: 'id' }])
  userPaymentMethod: UserPaymentMethod;

  @ManyToOne(() => Address, (address) => address.shopOrder)
  @JoinColumn([{ name: 'shipping_address_id', referencedColumnName: 'id' }])
  address: Address;
}
