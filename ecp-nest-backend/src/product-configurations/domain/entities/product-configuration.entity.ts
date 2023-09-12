import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';

export class IProductConfiguration {
  id: string;
  productItem: IProductItem;
  variationOption: IVariationOption;
}
