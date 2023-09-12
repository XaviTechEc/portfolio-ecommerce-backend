import { Product } from 'src/products/infrastructure/data/postgresql/entities/Product.entity';
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

@Entity('product_promotion')
export class ProductPromotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('character varying', { name: 'product_id' })
  productId: string;

  @PrimaryColumn('character varying', { name: 'promotion_id' })
  promotionId: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  // Relations
  @ManyToOne(() => Product, (product) => product.productPromotion)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
