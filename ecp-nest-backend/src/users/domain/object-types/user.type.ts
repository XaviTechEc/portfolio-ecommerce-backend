import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { CommentType } from 'src/comments/domain/object-types/comment.type';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { ReviewType } from 'src/reviews/domain/object-types/review.type';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';
import { ShoppingCartType } from 'src/shopping-carts/domain/object-types/shopping-cart.type';
import { UserType, Role, Gender } from '../enums';

@ObjectType()
export class UserObjType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => UserType)
  userType: UserType;

  @Field(() => [Role])
  roles: Role[];

  @Field(() => Gender)
  gender: Gender;

  @Field(() => String, { nullable: true })
  avatarImg?: string;

  @Field(() => Boolean, { defaultValue: true })
  active: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  lastConnection?: Date;

  // Relations
  @Field(() => [ShoppingCartType])
  shoppingCarts: ShoppingCartType[];

  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];

  @Field(() => [ReviewType])
  reviews: ReviewType[];

  @Field(() => [CommentType])
  comments: CommentType[];

  @Field(() => [ProductType])
  products: ProductType[];

  @Field(() => [CategoryType])
  categories: CategoryType[];

  //? Unnecessary field - query in parent
  // @Field(() => [UserAddressType])
  // userAddresses: UserAddressType[];

  //? Unnecessary field - query in parent
  // @Field(() => [UserPaymentMethodType])
  // userPaymentMethods: UserPaymentMethodType[];
}
