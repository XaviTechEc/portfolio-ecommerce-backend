import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateVariationOptionInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  variationId: any;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  value: string;
}
@InputType()
export class UpdateVariationOptionInput extends PartialType(
  CreateVariationOptionInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
