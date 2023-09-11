import { Address } from 'src/addresses/infrastructure/data/postgresql/entities';
import { OrderLine } from 'src/order-lines/infrastructure/data/postgresql/entities/OrderLine.entity';
import { OrderStatus } from 'src/order-status/infrastructure/data/postgresql/entities/OrderStatus.entity';
import { ShippingMethod } from 'src/shipping-methods/infrastructure/data/postgresql/entities/ShippingMethod.entity';
import { ShopOrderLocation } from 'src/shop-order-locations/infrastructure/data/postgresql/entities/ShopOrderLocation.entity';
import { UserPaymentMethod } from 'src/user-payment-methods/infrastructure/data/postgresql/entities/UserPaymentMethod.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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
