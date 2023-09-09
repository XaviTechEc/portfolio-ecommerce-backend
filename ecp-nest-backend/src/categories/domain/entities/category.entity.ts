import { ISeason } from '../seasons/season.entity';
import { IUser } from '../users/user.entity';

export class ICategory {
  id: string;
  value: string;
  description: string;
  active?: boolean;
  user: IUser;
  parentCategory?: ICategory;
  season: ISeason;
}
