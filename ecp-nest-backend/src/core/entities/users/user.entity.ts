import { Gender, Role, UserType } from 'src/core/enums';

export class IUser {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  userType: UserType;
  role: Role;
  gender: Gender;
  avatarImg?: string;
  active: boolean;
  lastConnection?: Date;
}
