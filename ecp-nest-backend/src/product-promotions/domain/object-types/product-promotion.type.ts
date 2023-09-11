import { ObjectType, Field } from '@nestjs/graphql';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { PromotionType } from 'src/promotions/domain/object-types/promotion.type';

@ObjectType()
export class ProductPromotionType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
