import { IVariationOption } from '../../entities/variation-option.entity';
import { IVariationOptionsRepository } from '../repositories/variation-options.repository';

export abstract class IVariationOptionsDataSourceService {
  abstract variationOptions: IVariationOptionsRepository<IVariationOption>;
}
