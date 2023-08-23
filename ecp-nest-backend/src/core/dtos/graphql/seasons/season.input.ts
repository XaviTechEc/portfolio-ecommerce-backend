import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSeasonInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  description: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

@InputType()
export class UpdateSeasonInput extends PartialType(CreateSeasonInput) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;
}
