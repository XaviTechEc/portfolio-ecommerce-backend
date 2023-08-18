import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShoppingCart } from './ShoppingCart';
import { ProductItem } from './ProductItem';

@Index('shopping_cart_product_item_pkey', ['id'], { unique: true })
@Index(
  'shopping_cart_product_item_shopping_cart_id_product_item_id_idx',
  ['productItemId', 'shoppingCartId'],
  { unique: true },
)
@Index(
  'shopping_cart_product_item_shopping_cart_id_idx',
  ['shoppingCartId'],
  {},
)
@Entity('shopping_cart_product_item', { schema: 'public' })
export class ShoppingCartProductItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'shopping_cart_id' })
  shoppingCartId: string;

  @Column('character varying', { name: 'product_item_id' })
  productItemId: string;

  @Column('smallint', { name: 'quantity' })
  quantity: number;

  // Relations
  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartProductItem,
  )
  @JoinColumn([{ name: 'shopping_cart_id', referencedColumnName: 'id' }])
  shoppingCart: ShoppingCart;

  @ManyToOne(
    () => ProductItem,
    (productItem) => productItem.shoppingCartProductItem,
  )
  @JoinColumn([{ name: 'product_item_id', referencedColumnName: 'id' }])
  productItem: ProductItem;
}
