import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@InputType()
export class CreateUserAddressInput extends IGenericAdditionalProps {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  user: any;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  address: any;

  @Field(() => Boolean)
  @IsNotEmpty()
  @IsBoolean()
  isDefault?: boolean;
}

@InputType()
export class UpdateUserAddressInput extends PartialType(
  CreateUserAddressInput,
) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
