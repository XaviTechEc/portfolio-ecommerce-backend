import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateCategoryInput extends IGenericAdditionalProps {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  season: any;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentCategory?: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  store: any;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}
