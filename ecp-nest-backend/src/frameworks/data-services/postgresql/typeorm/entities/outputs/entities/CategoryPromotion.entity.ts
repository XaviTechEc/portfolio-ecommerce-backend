import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category.entity';
import { Promotion } from './Promotion.entity';

@Entity('category_promotion')
export class CategoryPromotion {
  @ManyToOne(() => Category, (category) => category.categoryPromotion)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
