import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateShoppingCartProductItemInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  shoppingCart: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productItem: any;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantity: number;
}

@InputType()
export class UpdateShoppingCartProductItemInput extends PartialType(
  CreateShoppingCartProductItemInput,
) {}
