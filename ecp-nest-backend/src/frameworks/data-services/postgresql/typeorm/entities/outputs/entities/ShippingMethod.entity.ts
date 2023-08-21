import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopOrder } from './ShopOrder.entity';

@Index('shipping_method_pkey', ['id'], { unique: true })
@Entity('shipping_method')
export class ShippingMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('real', { name: 'price', default: 0 })
  price: number;

  // Relations
  @OneToMany(() => ShopOrder, (shopOrder) => shopOrder.shippingMethod)
  shopOrder: ShopOrder[];
}
