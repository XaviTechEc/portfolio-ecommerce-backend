import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { ITag } from 'src/tags/domain/entities/tag.entity';

export class IProductTag extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  product: IProduct;
  tag: ITag;
}
