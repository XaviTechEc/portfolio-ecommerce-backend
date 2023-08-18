import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { Promotion } from './Promotion';

@Entity('category_promotion', { schema: 'public' })
export class CategoryPromotion {
  @Column('varying character', { name: 'category_id' })
  categoryId: string;

  @Column('varying character', { name: 'promotion_id' })
  promotionId: string;

  @ManyToOne(() => Category, (category) => category.categoryPromotion)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
