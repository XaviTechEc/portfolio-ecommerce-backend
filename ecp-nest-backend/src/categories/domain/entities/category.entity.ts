import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { IStore } from 'src/stores/domain/entities/store.entity';

export class ICategory extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  name: string;
  description: string;
  parentCategory?: ICategory;
  season: ISeason;
  store: IStore;
}
