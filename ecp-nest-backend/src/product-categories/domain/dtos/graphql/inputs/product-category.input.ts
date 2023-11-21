import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateProductCategoryInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  category: any;
}

@InputType()
export class UpdateProductCategoryInput extends PartialType(
  CreateProductCategoryInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
