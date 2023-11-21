import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateVariationOptionInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  variation: any;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  value: string;
}

@InputType()
export class UpdateVariationOptionInput extends PartialType(
  CreateVariationOptionInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
