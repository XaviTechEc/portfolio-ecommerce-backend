import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PermissionEntityAccess } from 'src/permissions/domain/enums/permission-entity.enum';
import { PermissionOperation } from 'src/permissions/domain/enums/permission-operation.enum';
import { Role } from 'src/roles/infrastructure/data/postgresql/entities/Role.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('permission_pkey', ['id'], { unique: true })
@Entity()
export class Permission extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PermissionEntityAccess,
  })
  entity: PermissionEntityAccess;

  @Column({
    type: 'enum',
    enum: PermissionOperation,
  })
  operation: PermissionOperation;

  // Relations
  @ManyToMany(() => Role, (role) => role.permissions, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
