import { UserType, Role, Gender } from '../enums';

export class IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
  userType: UserType;
  roles: Role[];
  gender?: Gender;
  avatarImg?: string;
  active?: boolean;
  lastConnection?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
