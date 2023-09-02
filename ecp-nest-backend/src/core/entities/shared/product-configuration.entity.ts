import { IProductItem } from '../products/product-item.entity';
import { IVariationOption } from '../variations/variation-option.entity';

export class IProductConfiguration {
  productItem: IProductItem;
  variationOption: IVariationOption;
}
