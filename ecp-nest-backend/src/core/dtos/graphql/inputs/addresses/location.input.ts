import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty, IsDecimal } from 'class-validator';

@InputType()
export class CreateLocationInput {
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
