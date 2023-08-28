import { Field } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { PromotionType } from '../promotions/promotion.type';

export class ProductPromotionType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
