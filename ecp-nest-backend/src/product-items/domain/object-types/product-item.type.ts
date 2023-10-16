import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ImageType } from 'src/images/domain/object-types/image.type';
import { OrderLineType } from 'src/order-lines/domain/object-types/order-line.type';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { ShoppingCartProductItemType } from 'src/shopping-cart-product-items/domain/object-types/shopping-cart-product-item.type';

@ObjectType()
export class ProductItemType {
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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

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
