import { IProduct } from './product.entity';

export class IProductItem {
  id: string;
  sku: string;
  quantityInStock?: number;
  price?: number;
  slug: string;
  product: IProduct;
}
