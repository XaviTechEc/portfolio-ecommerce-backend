import { Field, Float, ID, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateShippingMethodInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Min(0)
  price: number;
}

export class UpdateShippingMethodInput extends PartialType(
  CreateShippingMethodInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
