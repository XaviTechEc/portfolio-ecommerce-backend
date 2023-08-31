import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

import { Address } from './Address.entity';
import { OrderLine } from './OrderLine.entity';
import { OrderStatus } from './OrderStatus.entity';
import { ShippingMethod } from './ShippingMethod.entity';
import { ShopOrderLocation } from './ShopOrderLocation.entity';
import { UserPaymentMethod } from './UserPaymentMethod.entity';

@Index('shop_order_pkey', ['id'], { unique: true })
@Entity('shop_order')
export class ShopOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('real', { name: 'order_total' })
  orderTotal: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(() => OrderLine, (orderLine) => orderLine.shopOrder)
  orderLine: OrderLine[];

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.shopOrder)
  @JoinColumn([{ name: 'shipping_method_id', referencedColumnName: 'id' }])
  shippingMethod: ShippingMethod;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.shopOrder)
  @JoinColumn([{ name: 'order_status_id', referencedColumnName: 'id' }])
  orderStatus: OrderStatus;

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

  @OneToMany(
    () => ShopOrderLocation,
    (shopOrderLocation) => shopOrderLocation.shopOrder,
  )
  shopOrderLocation: ShopOrderLocation[];
}
