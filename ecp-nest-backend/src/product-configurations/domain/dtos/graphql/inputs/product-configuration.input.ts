import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateProductConfigurationInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productItem: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  variationOption: any;
}

@InputType()
export class UpdateProductConfigurationInput extends PartialType(
  CreateProductConfigurationInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
