import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Season } from './Season.entity';
import { CategoryPromotion } from './CategoryPromotion.entity';
import { ProductCategory } from './ProductCategory.entity';
import { Variation } from './Variation.entity';
import { User } from './User.entity';

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
  active: boolean;

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
  parentCategory: Category;

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
}
