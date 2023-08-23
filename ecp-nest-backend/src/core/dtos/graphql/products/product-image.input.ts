import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProductImageInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsBoolean()
  @IsOptional()
  visible?: string;

  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  uploadedBy: string;
}

export class UpdateProductImageInput extends PartialType(
  CreateProductImageInput,
) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
