import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateLocationInput extends IGenericAdditionalProps {
  @Field(() => Float)
  @IsNotEmpty()
  @IsDecimal()
  lat: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsDecimal()
  lng: number;
}

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
