import { IProduct } from 'src/products/domain/entities/product.entity';

export class IProductItem {
  id: string;
  sku: string;
  quantityInStock?: number;
  price?: number;
  slug: string;
  product: IProduct;
}
