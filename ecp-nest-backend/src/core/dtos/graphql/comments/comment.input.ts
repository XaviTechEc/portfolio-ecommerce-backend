import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  visible?: boolean;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  reviewId: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  commentParentId?: string;
}

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
