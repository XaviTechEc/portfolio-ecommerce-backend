import { ICategory } from '../categories/category.entity';
import { IProduct } from '../products/product.entity';

export class IProductCategory {
  product: IProduct;
  category: ICategory;
}
