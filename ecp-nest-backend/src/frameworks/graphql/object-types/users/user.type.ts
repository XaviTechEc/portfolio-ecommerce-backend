import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender, Role, UserType } from 'src/core/enums';
import { UserAddressType } from '../shared/user-address.type';
import { ShoppingCartType } from '../cart/shopping-cart.type';
import { ShopOrderType } from '../cart/shop-order.type';
import { ReviewType } from '../reviews/review.type';
import { CommentType } from '../comments/comment.type';
import { UserPaymentMethodType } from '../shared/user-payment-method.entity.type';
import { ProductType } from '../products/product.type';
import { CategoryType } from '../categories/category.type';

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

  @Field(() => Role)
  role: Role;

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

  @Field(() => String, { nullable: true })
  lastConnection?: Date;

  // Relations
  @Field(() => [UserAddressType])
  userAddresses: UserAddressType[];

  @Field(() => [ShoppingCartType])
  shoppingCarts: ShoppingCartType[];

  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];

  @Field(() => [ReviewType])
  reviews: ReviewType[];

  @Field(() => [CommentType])
  comments: CommentType[];

  @Field(() => [UserPaymentMethodType])
  userPaymentMethods: UserPaymentMethodType[];

  @Field(() => [ProductType])
  products: ProductType[];

  @Field(() => [CategoryType])
  categories: CategoryType[];
}
