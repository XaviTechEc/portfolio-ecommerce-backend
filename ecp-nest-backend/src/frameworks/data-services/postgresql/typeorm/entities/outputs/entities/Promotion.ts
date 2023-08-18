import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPromotion } from './CategoryPromotion';
import { ProductPromotion } from './ProductPromotion';

@Index('promotion_pkey', ['id'], { unique: true })
@Entity('promotion', { schema: 'public' })
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('smallint', {
    name: 'percentage_discount',
    nullable: true,
    default: 0,
  })
  percentageDiscount: number | null;

  @Column('timestamptz', {
    name: 'start_date',
    nullable: true,
  })
  startDate: Date | null;

  @Column('timestamptz', { name: 'end_date', nullable: true })
  endDate: Date | null;

  // Relations
  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.promotion,
  )
  productPromotion: ProductPromotion[];

  @OneToMany(
    () => CategoryPromotion,
    (categoryPromotion) => categoryPromotion.promotion,
  )
  categoryPromotion: CategoryPromotion[];
}
