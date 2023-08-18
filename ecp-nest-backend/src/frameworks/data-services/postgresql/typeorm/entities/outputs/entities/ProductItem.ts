import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Product } from './Product';
import { ShoppingCartProductItem } from './ShoppingCartProductItem';
import { OrderLine } from './OrderLine';
import { ProductImage } from './ProductImage';
import { ProductConfiguration } from './ProductConfiguration';

@Index('product_item_pkey', ['id'], { unique: true })
@Index('product_item_product_id_idx', ['product_id'], { unique: true })
@Index('product_item_sku_idx', ['sku'], { unique: true })
@Index('product_item_slug_idx', ['slug'], {})
@Entity('product_item', { schema: 'public' })
export class ProductItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varying character', { name: 'product_id' })
  productId: string;

  @Column('varying character', { name: 'sku', unique: true })
  sku: string;

  @Column('smallint', { name: 'quantity_in_stock', default: 0 })
  quantityInStock: number;

  @Column('real', { name: 'price' })
  price: number;

  @Column('varying character', { name: 'slug', unique: true })
  slug: string;

  // Relations
  @OneToMany(() => ProductImage, (productImage) => productImage.productItem)
  productImage: ProductImage[];

  @OneToMany(
    () => ShoppingCartProductItem,
    (shoppingCartProductItem) => shoppingCartProductItem.productItem,
  )
  shoppingCartProductItem: ShoppingCartProductItem[];

  @OneToMany(() => OrderLine, (orderLine) => orderLine.productItem)
  orderLine: OrderLine[];

  @ManyToOne(() => Product, (product) => product.productItem)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @OneToMany(
    () => ProductConfiguration,
    (productConfiguration) => productConfiguration.productItem,
  )
  productConfiguration: ProductConfiguration[];
}
