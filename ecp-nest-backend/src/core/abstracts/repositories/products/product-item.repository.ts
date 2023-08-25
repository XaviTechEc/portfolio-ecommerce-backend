import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { IProductItem } from 'src/core/entities';

export abstract class IProductItemsRepository {
  abstract getAllProductItems(): Promise<IProductItem[]>;
  abstract getAllProductItemsBy(
    fields: Partial<IProductItem>,
  ): Promise<IProductItem[]>;
  abstract getProductItemById(id: string): Promise<IProductItem>;
  abstract getOneProductItemBy(
    fields: Partial<IProductItem>,
  ): Promise<IProductItem>;
  abstract createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<IProductItem>;
  abstract updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<IProductItem>;
  abstract removeProductItem(id: string): Promise<IProductItem>;
}
