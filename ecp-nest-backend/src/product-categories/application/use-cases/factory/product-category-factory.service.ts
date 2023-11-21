import { Injectable } from '@nestjs/common';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import { IProductCategory } from 'src/product-categories/domain/entities/product-category.entity';

@Injectable()
export class ProductCategoryFactoryService {
  createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ) {
    const newProductCategory = new IProductCategory();
    newProductCategory.product = createProductCategoryInput.product;
    newProductCategory.category = createProductCategoryInput.category;
    newProductCategory.active = createProductCategoryInput.active;
    return newProductCategory;
  }
  updateProductCategory(
    updateProductCategoryInput: UpdateProductCategoryInput,
  ) {
    const newProductCategory = new IProductCategory();
    newProductCategory.id = updateProductCategoryInput.id;
    newProductCategory.product = updateProductCategoryInput.product;
    newProductCategory.category = updateProductCategoryInput.category;
    newProductCategory.active = updateProductCategoryInput.active;
    return newProductCategory;
  }
}
