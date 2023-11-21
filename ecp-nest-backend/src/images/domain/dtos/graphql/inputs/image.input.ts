import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateImageInput extends IGenericAdditionalProps {
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

  @Field(() => ID, { nullable: true })
  @IsNotEmpty()
  @IsUUID()
  billboard: any;
}

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
