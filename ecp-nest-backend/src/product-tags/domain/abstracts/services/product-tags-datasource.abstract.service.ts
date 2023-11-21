import { IProductTag } from '../../entities/product-tag.entity';
import { IProductTagsRepository } from '../repositories/product-tag.repository';

export abstract class IProductTagsDataSourceService {
  abstract productTags: IProductTagsRepository<IProductTag>;
}
