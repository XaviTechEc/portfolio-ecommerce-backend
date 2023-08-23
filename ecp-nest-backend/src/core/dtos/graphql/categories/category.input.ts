import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  value: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  seasonId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  parentCategoryId?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;
}
