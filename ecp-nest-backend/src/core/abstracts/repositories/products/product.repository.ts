import { IProduct } from 'src/core/entities';

export abstract class IProductsRepository {
  abstract getAllProducts(): Promise<IProduct[]>;
  abstract getAllProductsBy(fields: Partial<IProduct>): Promise<IProduct[]>;
  abstract getProductById(id: string): Promise<IProduct>;
  abstract getOneProductBy(fields: Partial<IProduct>): Promise<IProduct>;
  abstract createProduct(createProductInput: any): Promise<IProduct>;
  abstract updateProduct(updateProductInput: any): Promise<IProduct>;
  abstract removeProduct(id: string): Promise<IProduct>;
}
