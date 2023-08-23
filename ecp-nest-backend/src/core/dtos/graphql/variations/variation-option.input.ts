import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateVariationOptionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  variationId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  value: string;
}

export class UpdateVariationOptionInput extends PartialType(
  CreateVariationOptionInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
