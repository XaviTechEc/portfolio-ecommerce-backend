import { IProduct } from '../../entities/product.entity';
import { IProductsRepository } from '../repositories/products.repository';

export abstract class IProductsDataSourceService {
  // Products
  abstract products: IProductsRepository<IProduct>;
}
