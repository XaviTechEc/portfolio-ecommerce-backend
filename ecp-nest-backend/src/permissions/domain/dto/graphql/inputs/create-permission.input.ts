import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IGenericAdditionalProps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PermissionEntityAccess } from 'src/permissions/domain/enums/permission-entity.enum';
import { PermissionOperation } from 'src/permissions/domain/enums/permission-operation.enum';

@InputType()
export class CreatePermissionInput extends IGenericAdditionalProps {
  @Field(() => PermissionEntityAccess, { name: 'entities' })
  @IsNotEmpty()
  @IsEnum(PermissionEntityAccess)
  entity: PermissionEntityAccess;

  @Field(() => PermissionOperation, { name: 'operations' })
  @IsNotEmpty()
  @IsEnum(PermissionOperation)
  operation: PermissionOperation;
}
