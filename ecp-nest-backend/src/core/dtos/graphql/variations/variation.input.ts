import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateVariationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
