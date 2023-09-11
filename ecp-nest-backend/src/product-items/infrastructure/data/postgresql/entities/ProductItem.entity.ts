import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product.entity';
import { ShoppingCartProductItem } from './ShoppingCartProductItem.entity';
import { OrderLine } from './OrderLine.entity';
import { ProductConfiguration } from './ProductConfiguration.entity';
import { Image } from './Image.entity';

@Index('product_item_pkey', ['id'], { unique: true })
@Index('product_item_sku_idx', ['sku'], { unique: true })
@Index('product_item_slug_idx', ['slug'], {})
@Entity('product_item')
export class ProductItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column('character varying', { name: 'sku', unique: true })
  sku: string;

  @Column('smallint', { name: 'quantity_in_stock', default: 0 })
  quantityInStock: number;

  @Column('real', { name: 'price' })
  price?: number;

  @Column('character varying', { name: 'slug', unique: true })
  slug: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;
  // Relations
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

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];
}