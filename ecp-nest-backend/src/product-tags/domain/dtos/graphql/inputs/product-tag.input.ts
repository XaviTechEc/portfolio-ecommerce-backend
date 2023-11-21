import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateProductTagInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  product: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  tag: any;
}

@InputType()
export class UpdateProductTagInput extends PartialType(CreateProductTagInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
