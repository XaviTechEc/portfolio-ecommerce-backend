import { Field, Float, ID, Int, PartialType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductItemInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  sku: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  quantityInStock?: number;

  @Field(() => Float)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  price?: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  slug: string;
}

export class UpdateProductItemInput extends PartialType(
  CreateProductItemInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}