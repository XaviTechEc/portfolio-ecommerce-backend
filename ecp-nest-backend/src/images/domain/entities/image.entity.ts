import { IBillboard } from 'src/billboard/domain/entities/billboard.entity';
import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';

export class IImage extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  url: string;
  extension: string;
  product?: IProduct;
  productItem?: IProductItem;
  category?: ICategory;
  billboard?: IBillboard;
}
