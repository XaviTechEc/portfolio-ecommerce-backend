import { ICategory } from '../categories/category.entity';

export class IVariation {
  id: string;
  name: string;
  category: ICategory;
}
