import { Injectable } from '@nestjs/common';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/core/dtos';
import { IProductCategory } from 'src/core/entities';

@Injectable()
export class ProductCategoryFactoryService {
  createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ) {
    const newProductCategory = new IProductCategory();
    newProductCategory.product = createProductCategoryInput.product;
    newProductCategory.category = createProductCategoryInput.category;
    return newProductCategory;
  }
  updateProductCategory(
    updateProductCategoryInput: UpdateProductCategoryInput,
  ) {
    const newProductCategory = new IProductCategory();
    newProductCategory.product = updateProductCategoryInput.product;
    newProductCategory.category = updateProductCategoryInput.category;
    return newProductCategory;
  }
}
