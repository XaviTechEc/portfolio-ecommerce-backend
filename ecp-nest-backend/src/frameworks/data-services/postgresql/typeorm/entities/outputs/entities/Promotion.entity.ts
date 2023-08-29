import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryPromotion } from './CategoryPromotion.entity';
import { ProductPromotion } from './ProductPromotion.entity';

@Index('promotion_pkey', ['id'], { unique: true })
@Entity('promotion')
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
  percentageDiscount?: number;

  @Column('timestamptz', {
    name: 'start_date',
    nullable: true,
  })
  startDate?: Date;

  @Column('timestamptz', { name: 'end_date', nullable: true })
  endDate?: Date;

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
