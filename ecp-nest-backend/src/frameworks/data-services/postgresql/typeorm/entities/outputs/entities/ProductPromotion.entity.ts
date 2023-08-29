import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';
import { Promotion } from './Promotion.entity';

@Entity('product_promotion')
export class ProductPromotion {
  // Relations
  @ManyToOne(() => Product, (product) => product.productPromotion)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
