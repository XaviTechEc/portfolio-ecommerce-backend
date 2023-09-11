import { Category } from 'src/categories/infrastructure/data/postgresql/entities/Category.entity';
import { Promotion } from 'src/promotions/infrastructure/data/postgresql/entities/Promotion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('category_promotion')
export class CategoryPromotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'category_id' })
  categoryId: string;

  @PrimaryColumn('character varying', { name: 'promotion_id' })
  promotionId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => Category, (category) => category.categoryPromotion)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Promotion, (promotion) => promotion.categoryPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
