import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductInput,
  UpdateProductInput,
} from '../../dtos/graphql/inputs/product.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IProductsRepository<T> {
  abstract getAllProducts(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;

  abstract getProductById(id: string): Promise<T>;
  abstract createProduct(createProductInput: CreateProductInput): Promise<T>;
  abstract updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<T>;
  abstract removeProduct(id: string): Promise<T>;

  abstract getProductsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
