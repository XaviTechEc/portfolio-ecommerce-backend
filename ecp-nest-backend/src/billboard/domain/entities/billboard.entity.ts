import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { IStore } from 'src/stores/domain/entities/store.entity';

export class IBillboard {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
  store: IStore;
  season: ISeason;
}
