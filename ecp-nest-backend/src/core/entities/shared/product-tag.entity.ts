import { IProduct } from '../products/product.entity';
import { ITag } from '../tags/tag.entity';

export class IProductTag {
  id: string;
  product: IProduct;
  tag: ITag;
}
