import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateAddressInput extends IGenericAdditionalProps {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  unitNumber?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  streetNumber?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field(() => String, { nullable: true })
  @IsString()
  region?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsPostalCode()
  postalCode: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  country: any;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  reference?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  location?: any;
}

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
