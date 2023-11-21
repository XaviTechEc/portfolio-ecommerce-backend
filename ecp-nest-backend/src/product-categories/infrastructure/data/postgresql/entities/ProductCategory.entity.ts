import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_category')
export class ProductCategory extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'product_id' })
  productId: string;

  @PrimaryColumn('character varying', { name: 'category_id' })
  categoryId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productCategory)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Category, (category) => category.productCategories)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;
}
