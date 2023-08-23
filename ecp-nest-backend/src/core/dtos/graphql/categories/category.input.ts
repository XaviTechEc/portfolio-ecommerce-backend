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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  value: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  seasonId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  parentCategoryId?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}
