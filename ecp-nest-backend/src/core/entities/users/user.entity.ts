import { Gender, Role, UserType } from 'src/core/enums';

export class IUser {
  id: string;
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

  constructor(props: Partial<IUser>) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.fullName = props.fullName;
    this.phoneNumber = props.phoneNumber;
    this.userType = props.userType;
    this.role = props.role;
    this.gender = props.gender;
    this.avatarImg = props.avatarImg;
    this.active = props.active;
    this.lastConnection = props.lastConnection;
  }
}
