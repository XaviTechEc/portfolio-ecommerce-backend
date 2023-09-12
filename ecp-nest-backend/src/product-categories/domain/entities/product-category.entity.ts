import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';

export class IProductCategory {
  id: string;
  product: IProduct;
  category: ICategory;
}
