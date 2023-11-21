import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';

export class IProductItem extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  sku: string;
  quantityInStock?: number;
  price?: number;
  slug: string;
  product: IProduct;
}
