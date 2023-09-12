import { IVariation } from '../../entities/variation.entity';
import { IVariationsRepository } from '../repositories/variations.repository';

export abstract class IVariationsDataSourceService {
  abstract variations: IVariationsRepository<IVariation>;
}
