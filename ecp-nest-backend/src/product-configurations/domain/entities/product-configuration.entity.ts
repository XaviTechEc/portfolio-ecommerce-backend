import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';

export class IProductConfiguration extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  productItem: IProductItem;
  variationOption: IVariationOption;
}
