import { CategoryPromotion } from 'src/category-promotions/infrastructure/data/postgresql/entities/CategoryPromotion.entity';
import { ProductPromotion } from 'src/product-promotions/infrastructure/data/postgresql/entities/ProductPromotion.entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

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
