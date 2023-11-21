import { CategoryPromotion } from 'src/category-promotions/infrastructure/data/postgresql/entities/CategoryPromotion.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { ProductCategory } from 'src/product-categories/infrastructure/data/postgresql/entities/ProductCategory.entity';
import { Season } from 'src/seasons/infrastructure/data/postgresql/entities/Season.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import { Variation } from 'src/variations/infrastructure/data/postgresql/entities/Variation.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('category_pkey', ['id'], { unique: true })
@Entity('category')
export class Category extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'value' })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  // Relations
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productCategories: ProductCategory[];

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @ManyToOne(() => Category, (category) => category.categories, {
    nullable: true,
  })
  @JoinColumn([{ name: 'parent_category_id', referencedColumnName: 'id' }])
  parentCategory?: Category;

  @OneToMany(
    () => CategoryPromotion,
    (categoryPromotion) => categoryPromotion.category,
  )
  categoryPromotions: CategoryPromotion[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Variation[];

  @ManyToOne(() => Season, (season) => season.categories)
  @JoinColumn([{ name: 'season_id', referencedColumnName: 'id' }])
  season: Season;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @ManyToOne(() => Store, (store) => store.categories)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}
