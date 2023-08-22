import { Gender, Role, UserType } from 'src/core/enums';

export class User {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  type: UserType;
  role: Role;
  gender: Gender;
  imgUrl?: string;
  isActive: boolean;
  lastConnection?: Date;
}
