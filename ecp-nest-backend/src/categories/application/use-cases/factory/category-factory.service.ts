import { Injectable } from '@nestjs/common';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import { ICategory } from 'src/categories/domain/entities/category.entity';

@Injectable()
export class CategoryFactoryService {
  createCategory(createCategoryInput: CreateCategoryInput) {
    const newCategory = new ICategory();
    newCategory.value = createCategoryInput.value;
    newCategory.description = createCategoryInput.description;
    newCategory.season = createCategoryInput.season;
    newCategory.parentCategory = createCategoryInput.parentCategory;
    newCategory.active = createCategoryInput.active;
    newCategory.user = createCategoryInput.user;
    newCategory.store = createCategoryInput.store;
    return newCategory;
  }
  updateCategory(updateCategoryInput: UpdateCategoryInput) {
    const newCategory = new ICategory();
    newCategory.value = updateCategoryInput.value;
    newCategory.description = updateCategoryInput.description;
    newCategory.season = updateCategoryInput.season;
    newCategory.parentCategory = updateCategoryInput.parentCategory;
    newCategory.active = updateCategoryInput.active;
    newCategory.user = updateCategoryInput.user;
    newCategory.store = updateCategoryInput.store;
    return newCategory;
  }
}
