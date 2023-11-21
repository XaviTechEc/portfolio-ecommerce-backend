import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';

@InputType()
export class CreateRoleInput extends IGenericAdditionalProps {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEnum(RoleValue, { each: true })
  value: string;
}
