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
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreatePromotionInput extends IGenericAdditionalProps {
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
