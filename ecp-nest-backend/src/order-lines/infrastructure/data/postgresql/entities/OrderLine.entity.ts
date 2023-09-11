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
import { Review } from './Review.entity';
import { ProductItem } from './ProductItem.entity';
import { ShopOrder } from './ShopOrder.entity';

@Index('order_line_pkey', ['id'], { unique: true })
@Entity('order_line')
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint', { name: 'quantity' })
  quantity: number;

  @Column('real', { name: 'total_price' })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

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