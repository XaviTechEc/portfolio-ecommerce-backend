import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateReviewInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  orderLine: any;

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;
}

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
