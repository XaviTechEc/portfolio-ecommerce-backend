import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateVariationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  categoryId: any;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

@InputType()
export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
