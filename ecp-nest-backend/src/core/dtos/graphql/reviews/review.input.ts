import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  orderedProductId: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  ratingValue: number;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;
}

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
