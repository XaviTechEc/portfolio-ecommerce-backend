import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

/*
  Table shop_order { 
  id varchar [pk, not null]
  user_id varchar [not null]
  user_payment_method_id varchar [not null]
  shipping_address_id varchar [not null]
  shipping_method_id varchar [not null]
  order_total number [not null]
  order_status_id varchar [not null]
  created_at timestamp [default: 'now()']
  updated_at timestamp 
  last_location_id varchar 
  indexes { 
    (user_id)[unique]
  }
}
*/

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

  @Column('float', { name: 'order_total' })
  orderTotal: number;

  @Column('varying character', { name: 'order_status_id' })
  orderStatusId: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => Date.now(),
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('varying character', { name: 'last_location_id', nullable: true })
  lastLocationId: string | null;

  @ManyToOne(() => User, (user) => user.shopOrder)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
