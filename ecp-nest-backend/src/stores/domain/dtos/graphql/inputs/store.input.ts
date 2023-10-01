import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateStoreInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  slug: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;
}

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
