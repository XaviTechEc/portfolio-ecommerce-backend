import { IUser } from 'src/users/domain/entities/user.entity';

export interface IAuthResponse {
  user: IUser;
  token: string;
}
