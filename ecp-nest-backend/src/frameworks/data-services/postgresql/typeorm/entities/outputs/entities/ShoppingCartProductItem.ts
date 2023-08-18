import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ShoppingCart } from './ShoppingCart';

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
  @Column('character varying', { primary: true, name: 'id', generated: 'uuid' })
  id: string;

  @Column('character varying', { name: 'shopping_cart_id' })
  shoppingCartId: string;

  @Column('character varying', { name: 'product_item_id' })
  productItemId: string;

  @Column('integer', { name: 'quantity', default: () => '1' })
  quantity: number;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart) => shoppingCart.shoppingCartProductItems,
  )
  @JoinColumn([{ name: 'shopping_cart_id', referencedColumnName: 'id' }])
  shoppingCart: ShoppingCart;
}
