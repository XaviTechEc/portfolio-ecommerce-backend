import { Field, Float, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateShopOrderInput {
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  orderTotal: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shippingMethodId: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  orderStatusId: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userPaymentMethodId: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shoppingAddressId: any;
}

export class UpdateShopOrderInput extends PartialType(CreateShopOrderInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
