import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateBillboardInput extends IGenericAdditionalProps {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  store: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  season: any;
}

@InputType()
export class UpdateBillboardInput extends PartialType(CreateBillboardInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
