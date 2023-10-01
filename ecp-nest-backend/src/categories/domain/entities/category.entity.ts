import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class ICategory {
  id: string;
  value: string;
  description: string;
  active?: boolean;
  user: IUser;
  parentCategory?: ICategory;
  season: ISeason;
  store: IStore;
}
