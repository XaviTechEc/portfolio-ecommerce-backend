import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateVariationInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}

export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
