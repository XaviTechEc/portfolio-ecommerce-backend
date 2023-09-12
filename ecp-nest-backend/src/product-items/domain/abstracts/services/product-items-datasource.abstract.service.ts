import { IProductItem } from '../../entities/product-item.entity';
import { IProductItemsRepository } from '../repositories/product-item.repository';

export abstract class IProductItemsDataSourceService {
  abstract productItems: IProductItemsRepository<IProductItem>;
}
