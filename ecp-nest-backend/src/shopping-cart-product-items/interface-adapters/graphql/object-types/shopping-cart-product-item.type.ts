import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';
import { ShoppingCartType } from 'src/shopping-carts/interface-adapters/graphql/object-types/shopping-cart.type';

@ObjectType()
export class ShoppingCartProductItemType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  quantity: number;

  // Relations
  @Field(() => ShoppingCartType)
  shoppingCart: ShoppingCartType;

  @Field(() => ProductItemType)
  productItem: ProductItemType;
}
