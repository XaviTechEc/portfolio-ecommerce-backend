import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProductImageInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  visible?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  uploadedBy: string;
}

export class UpdateProductImageInput extends PartialType(
  CreateProductImageInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
