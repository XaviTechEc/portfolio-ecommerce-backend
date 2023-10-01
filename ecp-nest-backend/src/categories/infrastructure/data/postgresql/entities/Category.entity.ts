import { CategoryPromotion } from 'src/category-promotions/infrastructure/data/postgresql/entities/CategoryPromotion.entity';
import { Image } from 'src/images/infrastructure/data/postgresql/entities/Image.entity';
import { ProductCategory } from 'src/product-categories/infrastructure/data/postgresql/entities/ProductCategory.entity';
import { Season } from 'src/seasons/infrastructure/data/postgresql/entities/Season.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Variation } from 'src/variations/infrastructure/data/postgresql/entities/Variation.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Index('category_pkey', ['id'], { unique: true })
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'value' })
  value: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('boolean', { name: 'active', default: true })
  active?: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productCategory: ProductCategory[];

  @ManyToOne(() => User, (user) => user.category)
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Category, (category) => category.parentCategory)
  category: Category[];

  @ManyToOne(() => Category, (category) => category.category)
  @JoinColumn([{ name: 'parent_category_id', referencedColumnName: 'id' }])
  parentCategory?: Category;

  @OneToMany(
    () => CategoryPromotion,
    (categoryPromotion) => categoryPromotion.category,
  )
  categoryPromotion: CategoryPromotion[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variation: Variation[];

  @ManyToOne(() => Season, (season) => season.category)
  @JoinColumn([{ name: 'season_id', referencedColumnName: 'id' }])
  season: Season;

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];

  @ManyToOne(() => Store, (store) => store.categories)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}
