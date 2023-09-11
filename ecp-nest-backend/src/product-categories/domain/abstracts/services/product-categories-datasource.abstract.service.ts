import { IProductCategory } from '../../entities/product-category.entity';
import { IProductCategoryRepository } from '../repositories/product-category.repository';

export abstract class IProductCategoriesDataSourceService {
  abstract productCategories: IProductCategoryRepository<IProductCategory>;
}
