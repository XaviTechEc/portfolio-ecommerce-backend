import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { OrderLine } from 'src/order-lines/infrastructure/data/postgresql/entities/OrderLine.entity';
import { ProductConfiguration } from 'src/product-configurations/infrastructure/data/postgresql/entities/ProductConfiguration.entity';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import { ShoppingCartProductItem } from 'src/shopping-cart-product-items/infrastructure/data/postgresql/entities/ShoppingCartProductItem.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Index('product_item_pkey', ['id'], { unique: true })
@Index('product_item_sku_idx', ['sku'], { unique: true })
@Index('product_item_slug_idx', ['slug'], {})
@Entity('product_item')
export class ProductItem extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
