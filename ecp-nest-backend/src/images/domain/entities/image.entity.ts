import { ICategory } from '../categories/category.entity';
import { IProductItem } from '../products/product-item.entity';
import { IProduct } from '../products/product.entity';
import { IUser } from '../users/user.entity';

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
}
