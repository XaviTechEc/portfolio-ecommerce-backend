import { Field, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';
import { PromotionType } from 'src/promotions/interface-adapters/graphql/object-types/promotion.type';

@ObjectType()
export class ProductPromotionType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
