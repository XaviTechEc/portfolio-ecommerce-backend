import { IBillboard } from '../../entities/billboard.entity';
import { IBillboardsRepository } from '../repositories/billboards.repository';

export abstract class IBillboardsDataSourceService {
  abstract billboards: IBillboardsRepository<IBillboard>;
}
