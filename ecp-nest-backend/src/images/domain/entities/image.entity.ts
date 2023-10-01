import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IImage {
  id: string;
  url: string;
  extension: string;
  createdAt: Date;
  updatedAt?: Date;
  product?: IProduct;
  productItem?: IProductItem;
  category?: ICategory;
  user: IUser;
  billboard?: IBillboard;
}
