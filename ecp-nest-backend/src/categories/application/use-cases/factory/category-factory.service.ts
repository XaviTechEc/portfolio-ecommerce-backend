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
    newCategory.name = createCategoryInput.name;
    newCategory.description = createCategoryInput.description;
    newCategory.season = createCategoryInput.season;
    newCategory.parentCategory = createCategoryInput.parentCategory;
    newCategory.store = createCategoryInput.store;
    newCategory.active = createCategoryInput.active;
    return newCategory;
  }
  updateCategory(updateCategoryInput: UpdateCategoryInput) {
    const newCategory = new ICategory();
    newCategory.id = updateCategoryInput.id;
    newCategory.name = updateCategoryInput.name;
    newCategory.description = updateCategoryInput.description;
    newCategory.season = updateCategoryInput.season;
    newCategory.parentCategory = updateCategoryInput.parentCategory;
    newCategory.store = updateCategoryInput.store;
    newCategory.active = updateCategoryInput.active;
    return newCategory;
  }
}
