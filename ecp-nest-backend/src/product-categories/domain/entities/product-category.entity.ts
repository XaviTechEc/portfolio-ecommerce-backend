import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';

export class IProductCategory extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  product: IProduct;
  category: ICategory;
}
