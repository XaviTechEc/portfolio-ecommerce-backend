import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';
import { OrderLineType } from 'src/order-lines/interface-adapters/graphql/object-types/order-line.type';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';
import { ShoppingCartProductItemType } from 'src/shopping-cart-product-items/interface-adapters/graphql/object-types/shopping-cart-product-item.type';

@ObjectType()
export class ProductItemType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  sku: string;

  @Field(() => Float, { nullable: true })
  quantityInStock?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String)
  slug: string;

  // Relations
  @Field(() => [ShoppingCartProductItemType])
  shoppingCartProductItems: ShoppingCartProductItemType[];

  @Field(() => [OrderLineType])
  orderLines: OrderLineType[];

  @Field(() => ProductType)
  product: ProductType;

  @Field(() => [ImageType])
  images: ImageType[];

  //? Unnecessary field - query in parent
  // @Field(() => [ProductConfigurationType])
  // productConfigurations: ProductConfigurationType[];
}
