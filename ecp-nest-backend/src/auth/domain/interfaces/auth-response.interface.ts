import { IUser } from 'src/core/entities';

export interface IAuthResponse {
  user: IUser;
  token: string;
}
