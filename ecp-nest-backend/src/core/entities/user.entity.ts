import { Gender, Role, UserType } from 'src/core/enums';

export class User {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  userType: UserType;
  role: Role;
  gender: Gender;
  imgUrl?: string;
  active: boolean;
  lastConnection?: Date;
}
