import { IUser } from 'src/users/domain/entities/user.entity';

export class IStore {
  id: string;
  title: string;
  description?: string;
  slug: string;
  user: IUser;
}
