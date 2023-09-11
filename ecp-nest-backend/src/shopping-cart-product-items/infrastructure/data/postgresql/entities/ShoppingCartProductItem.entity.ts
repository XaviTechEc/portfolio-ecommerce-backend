import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { ShoppingCart } from 'src/shopping-carts/infrastructure/data/postgresql/entities/ShoppingCart.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Index(
  'shopping_cart_product_item_shopping_cart_id_product_item_id_idx',
  ['productItem', 'shoppingCart'],
  { unique: true },
)
@Index('shopping_cart_product_item_shopping_cart_id_idx', ['shoppingCart'], {})
@Index('shopping_cart_product_item_product_item_id_idx', ['productItem'], {})
@Entity('shopping_cart_product_item')
export class ShoppingCartProductItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint', { name: 'quantity' })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

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
