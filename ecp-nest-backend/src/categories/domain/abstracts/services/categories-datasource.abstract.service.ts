import { ICategory } from '../../entities/category.entity';
import { ICategoriesRepository } from '../repositories/categories.repository';

export abstract class ICategoriesDataSourceService {
  abstract categories: ICategoriesRepository<ICategory>;
}
