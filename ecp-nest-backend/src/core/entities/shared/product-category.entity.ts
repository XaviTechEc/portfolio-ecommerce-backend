import { ICategory } from '../categories/category.entity';
import { IProduct } from '../products/product.entity';

export class IProductCategory {
  id: string;
  product: IProduct;
  category: ICategory;
}
