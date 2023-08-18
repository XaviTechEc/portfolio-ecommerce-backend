import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Promotion } from './Promotion';
import { Product } from './Product';

@Entity('product_promotion', { schema: 'public' })
export class ProductPromotion {
  @Column('character varying', { name: 'product_id' })
  productId: string;

  @Column('character varying', { name: 'promotion_id' })
  promotionId: string;

  // Relations
  @ManyToOne(() => Product, (product) => product.productPromotion)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.productPromotion)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
