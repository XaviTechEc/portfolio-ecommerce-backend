import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { ProductCategory } from 'src/product-categories/infrastructure/data/postgresql/entities/ProductCategory.entity';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { ProductPromotion } from 'src/product-promotions/infrastructure/data/postgresql/entities/ProductPromotion.entity';
import { ProductTag } from 'src/product-tags/infrastructure/data/postgresql/entities/ProductTag.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('product_pkey', ['id'], { unique: true })
@Entity('product')
export class Product extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'subtitle' })
  subtitle: string;

  @Column('text', { name: 'description' })
  description: string;

  // Relations
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.product,
  )
  productCategory: ProductCategory[];

  @OneToMany(() => ProductTag, (productTag) => productTag.product)
  productTag: ProductTag[];

  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.product,
  )
  productPromotion: ProductPromotion[];

  @OneToMany(() => ProductItem, (productItem) => productItem.product)
  productItem: ProductItem[];

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];
}
