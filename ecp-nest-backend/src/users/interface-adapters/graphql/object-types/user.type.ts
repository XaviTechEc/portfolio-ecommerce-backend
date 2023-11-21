import { Extensions, Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { CommentType } from 'src/comments/interface-adapters/graphql/object-types/comment.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';
import { ReviewType } from 'src/reviews/interface-adapters/graphql/object-types/review.type';
import { RoleType } from 'src/roles/interface-adapters/graphql/object-types/role.type';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';
import { ShoppingCartType } from 'src/shopping-carts/interface-adapters/graphql/object-types/shopping-cart.type';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import { Gender, UserType } from '../../../domain/enums';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';
import { checkRoleMiddleware } from 'src/common/interface-adapters/graphql/middlewares/check-role.middleware';

@ObjectType()
export class UserObjType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Extensions({ roles: [RoleValue.SUPER_ADMIN] })
  @Field(() => String, { middleware: [checkRoleMiddleware] })
  password: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => UserType)
  userType: UserType;

  @Field(() => [RoleType])
  roles: RoleType[];

  @Field(() => Gender)
  gender: Gender;

  @Field(() => String, { nullable: true })
  avatarImg?: string;

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

  @Field(() => [ImageType])
  images: ImageType[];

  @Field(() => [Store])
  stores: Store[];

  //? Unnecessary field - query in parent
  // @Field(() => [UserAddressType])
  // userAddresses: UserAddressType[];

  //? Unnecessary field - query in parent
  // @Field(() => [UserPaymentMethodType])
  // userPaymentMethods: UserPaymentMethodType[];
}
