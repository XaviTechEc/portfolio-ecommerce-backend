import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
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
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
