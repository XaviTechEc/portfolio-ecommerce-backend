import { Field, ID, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateProductTagInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  tag: any;
}

@InputType()
export class UpdateProductTagInput extends PartialType(CreateProductTagInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
