import { IProductCategory } from '../../entities/product-category.entity';
import { IProductCategoriesRepository } from '../repositories/product-categories.repository';

export abstract class IProductCategoriesDataSourceService {
  abstract productCategories: IProductCategoriesRepository<IProductCategory>;
}
