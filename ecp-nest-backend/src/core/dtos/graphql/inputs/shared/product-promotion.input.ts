import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateProductPromotionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productId: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  promotionId: any;
}

@InputType()
export class UpdateProductPromotionInput extends PartialType(
  CreateProductPromotionInput,
) {}
