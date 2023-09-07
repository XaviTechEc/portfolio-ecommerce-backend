import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';
import { ICategoryPromotion } from 'src/core/entities';
import { CategoryPromotionType } from 'src/core/object-types';
import { CategoryPromotionUseCases } from 'src/use-cases';

@Resolver(() => CategoryPromotionType)
export class CategoryPromotionResolver {
  constructor(private categoryPromotionUseCases: CategoryPromotionUseCases) {}

  @Query(() => [CategoryPromotionType], { name: 'categoryPromotions' })
  getAllCategoryPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ICategoryPromotion[]> {
    return this.categoryPromotionUseCases.getAllCategoryPromotion({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [CategoryPromotionType], {
    name: 'categoryPromotionsByCategory',
  })
  getCategoryPromotionsByCategory(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<ICategoryPromotion[]> {
    return this.categoryPromotionUseCases.getCategoryPromotionBy(
      term,
      ['category'],
      paginationArgs,
    );
  }

  @Query(() => [CategoryPromotionType], {
    name: 'categoryPromotionsByPromotion',
  })
  getCategoryPromotionsByPromotion(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<ICategoryPromotion[]> {
    return this.categoryPromotionUseCases.getCategoryPromotionBy(
      term,
      ['promotion'],
      paginationArgs,
    );
  }

  @Query(() => CategoryPromotionType, { name: 'categoryPromotion' })
  getCategoryPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.getCategoryPromotionById(id);
  }

  @Mutation(() => CategoryPromotionType)
  createCategoryPromotion(
    @Args('createCategoryPromotionInput')
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.createCategoryPromotion(
      createCategoryPromotionInput,
    );
  }

  @Mutation(() => CategoryPromotionType)
  updateCategoryPromotion(
    @Args('updateCategoryPromotionInput')
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.updateCategoryPromotion(
      updateCategoryPromotionInput.id,
      updateCategoryPromotionInput,
    );
  }

  @Mutation(() => CategoryPromotionType)
  removeCategoryPromotion(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.removeCategoryPromotion(id);
  }
}
