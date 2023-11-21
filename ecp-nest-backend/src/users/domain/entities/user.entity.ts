import { IGenericAdditionalPropsWithTimeStamptz } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IRole } from 'src/roles/domain/entities/role.entity';
import { Gender, UserType } from '../enums';

export class IUser extends IGenericAdditionalPropsWithTimeStamptz {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  userType: UserType;
  roles: IRole[];
  gender?: Gender;
  avatarImg?: string;
  lastConnection?: Date;
}
