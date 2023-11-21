import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Promotion } from 'src/promotions/infrastructure/data/postgresql/entities/Promotion.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category_promotion')
export class CategoryPromotion extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'category_id' })
  categoryId: string;

  @PrimaryColumn('character varying', { name: 'promotion_id' })
  promotionId: string;

  @ManyToOne(() => Category, (category) => category.categoryPromotions)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
