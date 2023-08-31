import { Field, Float, ID, Int, PartialType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOrderLineInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  productItemId: any;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  shopOrderId: any;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  totalPrice: number;
}

export class UpdateOrderLineInput extends PartialType(CreateOrderLineInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
