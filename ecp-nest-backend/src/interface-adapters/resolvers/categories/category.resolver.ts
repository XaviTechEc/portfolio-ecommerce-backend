import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCategoryInput,
  PaginationArgs,
  SearchArgs,
  UpdateCategoryInput,
} from 'src/core/dtos';
import { ICategory } from 'src/core/entities';
import { CategoryType } from 'src/core/object-types';
import { CategoryUseCases } from 'src/use-cases';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private categoryUseCases: CategoryUseCases) {}

  @Query(() => [CategoryType], { name: 'categories' })
  getAllCategories(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<ICategory>,
  ): Promise<ICategory[]> {
    return this.categoryUseCases.getAllCategories({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => CategoryType, { name: 'category' })
  getCategoryById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICategory> {
    return this.categoryUseCases.getCategoryById(id);
  }

  @Mutation(() => CategoryType)
  createCategory(
    @Args() createCategoryInput: CreateCategoryInput,
  ): Promise<ICategory> {
    return this.categoryUseCases.createCategory(createCategoryInput);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @Args() updateCategoryInput: UpdateCategoryInput,
  ): Promise<ICategory> {
    return this.categoryUseCases.updateCategory(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => CategoryType)
  removeCategory(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICategory> {
    return this.categoryUseCases.removeCategory(id);
  }
}
