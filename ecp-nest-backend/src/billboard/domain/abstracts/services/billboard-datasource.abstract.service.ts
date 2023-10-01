import { IBillboard } from '../../entities/billboard.entity';
import { IBillboardsRepository } from '../repositories/billboards.repository';

export abstract class IBillboardDataSourceService {
  abstract billboards: IBillboardsRepository<IBillboard>;
}
