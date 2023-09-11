import { ICategory } from 'src/categories/domain/entities/category.entity';

export class IVariation {
  id: string;
  name: string;
  category: ICategory;
}
