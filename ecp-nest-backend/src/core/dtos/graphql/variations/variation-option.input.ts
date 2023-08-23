import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateVariationOptionInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  variationId: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  value: string;
}

export class UpdateVariationOptionInput extends PartialType(
  CreateVariationOptionInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
