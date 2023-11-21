import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { Review } from 'src/reviews/infrastructure/data/postgresql/entities/Review.entity';
import { ShopOrder } from 'src/shop-orders/infrastructure/data/postgresql/entities/ShopOrder.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('order_line_pkey', ['id'], { unique: true })
@Entity('order_line')
export class OrderLine extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
