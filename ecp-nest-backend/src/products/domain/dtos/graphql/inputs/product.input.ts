import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateProductInput extends IGenericAdditionalProps {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  subtitle: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
