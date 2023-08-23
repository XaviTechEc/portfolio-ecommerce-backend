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
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field(() => String, { nullable: true })
  @IsString()
  region?: string;

  @Field(() => String)
  @IsPostalCode()
  @IsNotEmpty()
  postalCode: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  countryId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  reference?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  locationId?: string;
}

export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
