import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  subtitle: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  createdBy: any;

  @Field(() => String)
  @IsOptional()
  @IsString()
  imgUrl?: string;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(() => ID)
  @IsOptional()
  @IsUUID()
  updatedBy?: string;
}
