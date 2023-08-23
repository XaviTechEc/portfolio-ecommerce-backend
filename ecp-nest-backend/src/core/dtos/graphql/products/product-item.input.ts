import { Field, Float, ID, Int, PartialType } from '@nestjs/graphql';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductItemInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  sku: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  quantityInStock?: number;

  @Field(() => Float)
  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  price?: number;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  slug: string;
}

export class UpdateProductItemInput extends PartialType(
  CreateProductItemInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
