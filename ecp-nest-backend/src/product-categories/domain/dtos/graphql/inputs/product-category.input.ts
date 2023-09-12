import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateProductCategoryInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  category: any;
}

@InputType()
export class UpdateProductCategoryInput extends PartialType(
  CreateProductCategoryInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
