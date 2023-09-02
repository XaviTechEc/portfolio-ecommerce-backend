import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category.entity';
import { Promotion } from './Promotion.entity';

@Entity('category_promotion')
export class CategoryPromotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'category_id' })
  categoryId: string;

  @PrimaryColumn('character varying', { name: 'promotion_id' })
  promotionId: string;

  @ManyToOne(() => Category, (category) => category.categoryPromotion)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
