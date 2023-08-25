import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { IProduct } from 'src/core/entities';

export abstract class IProductsRepository {
  abstract getAllProducts(): Promise<IProduct[]>;
  abstract getAllProductsBy(fields: Partial<IProduct>): Promise<IProduct[]>;
  abstract getProductById(id: string): Promise<IProduct>;
  abstract getOneProductBy(fields: Partial<IProduct>): Promise<IProduct>;
  abstract createProduct(
    createProductInput: CreateProductInput,
  ): Promise<IProduct>;
  abstract updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<IProduct>;
  abstract removeProduct(id: string): Promise<IProduct>;
}
