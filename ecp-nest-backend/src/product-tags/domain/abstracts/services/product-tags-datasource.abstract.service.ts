import { IProductTag } from '../../entities/product-tag.entity';
import { IProductTagRepository } from '../repositories/product-tag.repository';

export abstract class IProductTagsDataSourceService {
  abstract productTags: IProductTagRepository<IProductTag>;
}
