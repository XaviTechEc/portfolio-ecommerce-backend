import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductCategoriesDataSourceService } from 'src/product-categories/domain/abstracts/services/product-categories-datasource.abstract.service';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import { IProductCategory } from 'src/product-categories/domain/entities/product-category.entity';
import { ProductCategoryFactoryService } from './factory/product-category-factory.service';

@Injectable()
export class ProductCategoryUseCases {
  constructor(
    private dataService: IProductCategoriesDataSourceService,
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
