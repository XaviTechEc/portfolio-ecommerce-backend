import { Resolver } from '@nestjs/graphql';
import { CategoryUseCases } from 'src/categories/application/use-cases/category-use-cases';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from 'src/categories/domain/dtos/graphql/inputs/category.input';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';

@Resolver(() => CategoryType)
export class CategoryResolver extends BaseResolver(CategoryType, {
  useCasesRef: CategoryUseCases,
  createInputRef: CreateCategoryInput,
  updateInputRef: UpdateCategoryInput,
}) {
  constructor(private categoryUseCases: CategoryUseCases) {
    super(categoryUseCases);
  }
}
