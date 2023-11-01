import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryPromotionUseCases } from 'src/category-promotions/application/use-cases/category-promotion-use-cases';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { CategoryPromotionType } from 'src/category-promotions/domain/object-types/category-promotion.type';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';

@Resolver(() => CategoryPromotionType)
export class CategoryPromotionResolver {
  constructor(private categoryPromotionUseCases: CategoryPromotionUseCases) {}

  @Query(() => [CategoryPromotionType], { name: 'categoryPromotions' })
  getAllCategoryPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
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
  ) {
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
  ) {
    return this.categoryPromotionUseCases.getCategoryPromotionBy(
      term,
      ['promotion'],
      paginationArgs,
    );
  }

  @Query(() => CategoryPromotionType, { name: 'categoryPromotion' })
  getCategoryPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.categoryPromotionUseCases.getCategoryPromotionById(id);
  }

  @Mutation(() => CategoryPromotionType)
  createCategoryPromotion(
    @Args('createCategoryPromotionInput')
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ) {
    return this.categoryPromotionUseCases.createCategoryPromotion(
      createCategoryPromotionInput,
    );
  }

  @Mutation(() => CategoryPromotionType)
  updateCategoryPromotion(
    @Args('updateCategoryPromotionInput')
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ) {
    return this.categoryPromotionUseCases.updateCategoryPromotion(
      updateCategoryPromotionInput.id,
      updateCategoryPromotionInput,
    );
  }

  @Mutation(() => CategoryPromotionType)
  removeCategoryPromotion(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.categoryPromotionUseCases.removeCategoryPromotion(id);
  }
}
