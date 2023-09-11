import { IProduct } from 'src/products/domain/entities/product.entity';
import { ITag } from 'src/tags/domain/entities/tag.entity';

export class IProductTag {
  id: string;
  product: IProduct;
  tag: ITag;
}
