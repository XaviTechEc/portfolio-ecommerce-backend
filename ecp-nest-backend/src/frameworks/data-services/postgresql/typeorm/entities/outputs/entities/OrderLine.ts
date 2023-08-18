import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './Review';
import { ProductItem } from './ProductItem';
import { ShopOrder } from './ShopOrder';

@Index('order_line_pkey', ['id'], { unique: true })
@Entity('order_line', { schema: 'public ' })
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varying character', { name: 'product_item_id' })
  productItemId: string;

  @Column('varying character', { name: 'shop_order_id' })
  shopOrderId: string;

  @Column('smallint', { name: 'quantity' })
  quantity: number;

  @Column('real', { name: 'total_price' })
  totalPrice: number;

  // Relations
  @OneToMany(() => Review, (review) => review.orderLine)
  review: Review[];

  @ManyToOne(() => ProductItem, (productItem) => productItem.orderLine)
  @JoinColumn([{ name: 'product_item_id', referencedColumnName: 'id' }])
  productItem: ProductItem;

  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.orderLine)
  @JoinColumn([{ name: 'shop_order_id', referencedColumnName: 'id' }])
  shopOrder: ShopOrder;
}
