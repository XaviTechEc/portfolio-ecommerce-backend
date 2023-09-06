import { Injectable } from '@nestjs/common';
import { IProductCategoryRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductCategory } from 'src/core/entities';

import {
  IGenericArgs,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
  PaginationArgs,
} from 'src/core/dtos';
import { ProductCategoryFactoryService } from '../factory';

@Injectable()
export class ProductCategoryUseCases
  implements IProductCategoryRepository<IProductCategory>
{
  constructor(
    private dataService: IDataSourcesService,
    private productCategoryFactoryService: ProductCategoryFactoryService,
  ) {}
  getProductCategoriesBy(
    term: string,
    fields: (keyof IProductCategory)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProductCategory[]> {
    return this.dataService.productCategories.getProductCategoriesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductCategory(
    args?: IGenericArgs<IProductCategory>,
  ): Promise<IProductCategory[]> {
    return this.dataService.productCategories.getAllProductCategory(args);
  }
  getProductCategoryById(id: string): Promise<IProductCategory> {
    return this.dataService.productCategories.getProductCategoryById(id);
  }
  createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<IProductCategory> {
    const productCategory =
      this.productCategoryFactoryService.createProductCategory(
        createProductCategoryInput,
      );
    return this.dataService.productCategories.createProductCategory(
      productCategory,
    );
  }
  updateProductCategory(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<IProductCategory> {
    const productCategory =
      this.productCategoryFactoryService.updateProductCategory(
        updateProductCategoryInput,
      );
    return this.dataService.productCategories.updateProductCategory(
      id,
      productCategory,
    );
  }
  removeProductCategory(id: string): Promise<IProductCategory> {
    return this.dataService.productCategories.removeProductCategory(id);
  }
}
