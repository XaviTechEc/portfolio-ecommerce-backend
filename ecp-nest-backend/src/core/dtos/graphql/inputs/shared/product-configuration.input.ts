import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateProductConfigurationInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productItem: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  variationOption: any;
}

@InputType()
export class UpdateProductConfigurationInput extends PartialType(
  CreateProductConfigurationInput,
) {}
