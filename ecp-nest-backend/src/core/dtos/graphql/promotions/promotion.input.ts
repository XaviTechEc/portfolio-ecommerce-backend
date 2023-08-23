import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePromotionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(100)
  percentageDiscount?: number;

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
export class UpdatePromotionInput extends PartialType(CreatePromotionInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
