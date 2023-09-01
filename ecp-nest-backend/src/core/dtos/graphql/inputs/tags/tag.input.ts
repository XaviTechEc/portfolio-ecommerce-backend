import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  code: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  value: string;
}

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
