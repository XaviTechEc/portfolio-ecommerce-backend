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

  @Query(() => CategoryPromotionType, { name: 'categoryPromotion' })
  getCategoryPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.getCategoryPromotionById(id);
  }

  @Mutation(() => CategoryPromotionType)
  createCategoryPromotion(
    @Args() createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    return this.categoryPromotionUseCases.createCategoryPromotion(
      createCategoryPromotionInput,
    );
  }

  @Mutation(() => CategoryPromotionType)
  updateCategoryPromotion(
    @Args() updateCategoryPromotionInput: UpdateCategoryPromotionInput,
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
