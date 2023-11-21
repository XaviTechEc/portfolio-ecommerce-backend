import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
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
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateProductItemInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product: any;

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

@InputType()
export class UpdateProductItemInput extends PartialType(
  CreateProductItemInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
