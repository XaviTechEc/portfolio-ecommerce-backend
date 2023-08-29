import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Promotion } from './Promotion.entity';
import { Product } from './Product.entity';

@Entity('product_promotion')
export class ProductPromotion {
  @PrimaryColumn('character varying', { name: 'product_id' })
  productId: string;

  @PrimaryColumn('character varying', { name: 'promotion_id' })
  promotionId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productPromotion)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
