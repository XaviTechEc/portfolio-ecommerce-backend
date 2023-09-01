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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

@InputType()
export class UpdateSeasonInput extends PartialType(CreateSeasonInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}
