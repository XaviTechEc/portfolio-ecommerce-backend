import { Injectable } from '@nestjs/common';
import { CreateCategoryInput, UpdateCategoryInput } from 'src/core/dtos';
import { ICategory } from 'src/core/entities';

@Injectable()
export class CategoryFactoryService {
  createCategory(createCategoryInput: CreateCategoryInput) {
    const newCategory = new ICategory();
    newCategory.value = createCategoryInput.value;
    newCategory.description = createCategoryInput.description;
    newCategory.seasonId = createCategoryInput.seasonId;
    newCategory.parentCategoryId = createCategoryInput.parentCategoryId;
    newCategory.active = createCategoryInput.active;
    newCategory.createdBy = createCategoryInput.createdBy;
    return newCategory;
  }
  updateCategory(updateCategoryInput: UpdateCategoryInput) {
    const newCategory = new ICategory();
    newCategory.value = updateCategoryInput.value;
    newCategory.description = updateCategoryInput.description;
    newCategory.seasonId = updateCategoryInput.seasonId;
    newCategory.parentCategoryId = updateCategoryInput.parentCategoryId;
    newCategory.active = updateCategoryInput.active;
    newCategory.createdBy = updateCategoryInput.createdBy;
    return newCategory;
  }
}
