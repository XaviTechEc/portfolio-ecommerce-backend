import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateCommentInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  review: any;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  commentParent?: any;
}

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
