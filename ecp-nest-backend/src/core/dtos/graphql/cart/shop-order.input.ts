import { Field, Float, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateShopOrderInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userPaymentMethodId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shippingAddressId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shippingMethodId: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  orderTotal: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  orderStatusId: string;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsUUID()
  lastLocationId?: string;
}

export class UpdateShopOrderInput extends PartialType(CreateShopOrderInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
