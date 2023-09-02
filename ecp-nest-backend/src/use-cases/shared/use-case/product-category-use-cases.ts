import { Injectable } from '@nestjs/common';
import { IProductCategoryRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductCategory } from 'src/core/entities';

import {
  IGenericArgs,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
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
  getAllProductCategory(
    args?: IGenericArgs<IProductCategory>,
  ): Promise<IProductCategory[]> {
    return this.dataService.productCategories.getAllProductCategory(args);
  }
  getOneProductCategoryById(id: string): Promise<IProductCategory> {
    return this.dataService.productCategories.getOneProductCategoryById(id);
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
  updateOneProductCategoryById(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<IProductCategory> {
    const productCategory =
      this.productCategoryFactoryService.updateProductCategory(
        updateProductCategoryInput,
      );
    return this.dataService.productCategories.updateOneProductCategoryById(
      id,
      productCategory,
    );
  }
  deleteOneProductCategoryById(id: string): Promise<IProductCategory> {
    return this.dataService.productCategories.deleteOneProductCategoryById(id);
  }
}
