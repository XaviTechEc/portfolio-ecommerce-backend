import { ISeason } from '../../entities/season.entity';
import { ISeasonsRepository } from '../repositories/seasons.repository';

export abstract class ISeasonsDataSourceService {
  // Seasons
  abstract seasons: ISeasonsRepository<ISeason>;
}
