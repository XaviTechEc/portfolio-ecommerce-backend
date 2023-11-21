import { Billboard } from 'src/billboard/infrastructure/data/postgresql/entities/billboard.entity';
import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItem } from 'src/product-items/infrastructure/data/postgresql/entities/ProductItem.entity';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('image_pkey', ['id'], { unique: true })
@Entity('image')
export class Image extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'url', unique: true })
  url: string;

  @Column('character varying', { name: 'extension' })
  extension: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.image, { nullable: true })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product?: Product;

  @ManyToOne(() => ProductItem, (productItem) => productItem.image, {
    nullable: true,
  })
  @JoinColumn([{ name: 'product_item_id', referencedColumnName: 'id' }])
  productItem?: ProductItem;

  @ManyToOne(() => Category, (category) => category.images, { nullable: true })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category?: Category;

  @ManyToOne(() => Billboard, (billboard) => billboard.images, {
    nullable: true,
  })
  @JoinColumn([{ name: 'billboard_id', referencedColumnName: 'id' }])
  billboard?: Billboard;
}
