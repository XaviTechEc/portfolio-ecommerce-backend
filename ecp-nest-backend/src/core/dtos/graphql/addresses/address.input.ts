import { Field, ID, Int, PartialType } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAddressInput {
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

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  countryId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  reference?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  locationId?: string;
}

export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
