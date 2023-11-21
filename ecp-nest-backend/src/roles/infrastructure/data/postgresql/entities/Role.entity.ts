import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { Permission } from 'src/permissions/infrastructure/data/postgresql/entities/Permission.entity';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('role_pkey', ['id'], { unique: true })
@Index('role_value_key', ['value'], { unique: true })
@Entity('role')
export class Role extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleValue,
    default: RoleValue.CLIENT,
    unique: true,
  })
  value: string;

  // Relations
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
