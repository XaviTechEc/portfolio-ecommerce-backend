import { IProduct } from './product.entity';

export class IProductItem {
  id: string;
  sku: string;
  quantityInStock?: number;
  price?: number;
  imgUrl?: string;
  slug: string;
  product: IProduct;
}
