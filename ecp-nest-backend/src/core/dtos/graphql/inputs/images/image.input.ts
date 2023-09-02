import { Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateImageInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  url: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  extension: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  product?: any;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  productItem?: any;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  category?: any;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsUUID()
  user: any;
}

export class UpdateImageInput extends PartialType(CreateImageInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
