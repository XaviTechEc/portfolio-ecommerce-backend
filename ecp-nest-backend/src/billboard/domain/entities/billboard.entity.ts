import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IBillboard extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  title: string;
  description?: string;
  store: IStore;
  season: ISeason;
}
