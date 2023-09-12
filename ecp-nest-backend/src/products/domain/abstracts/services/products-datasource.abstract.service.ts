import { IProduct } from '../../entities/product.entity';
import { IProductsRepository } from '../repositories/product.repository';

export abstract class IProductsDataSourceService {
  // Products
  abstract products: IProductsRepository<IProduct>;
}
