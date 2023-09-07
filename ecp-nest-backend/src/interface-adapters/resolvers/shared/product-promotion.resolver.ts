import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/core/dtos';
import { IProductPromotion } from 'src/core/entities';
import { ProductPromotionType } from 'src/core/object-types';
import { ProductPromotionUseCases } from 'src/use-cases';

@Resolver(() => ProductPromotionType)
export class ProductPromotionResolver {
  constructor(private productPromotionUseCases: ProductPromotionUseCases) {}

  @Query(() => [ProductPromotionType], { name: 'productPromotions' })
  getAllProductPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IProductPromotion[]> {
    return this.productPromotionUseCases.getAllProductPromotion({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductPromotionType], { name: 'productPromotionsByProduct' })
  getProductPromotionByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductPromotion[]> {
    return this.productPromotionUseCases.getProductPromotionsBy(
      term,
      ['product'],
      paginationArgs,
    );
  }
  @Query(() => [ProductPromotionType], { name: 'productPromotionsByPromotion' })
  getProductPromotionByPromotion(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductPromotion[]> {
    return this.productPromotionUseCases.getProductPromotionsBy(
      term,
      ['promotion'],
      paginationArgs,
    );
  }

  @Query(() => ProductPromotionType, { name: 'productPromotion' })
  getProductPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductPromotion> {
    return this.productPromotionUseCases.getProductPromotionById(id);
  }

  @Mutation(() => ProductPromotionType)
  createProductPromotion(
    @Args() createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<IProductPromotion> {
    return this.productPromotionUseCases.createProductPromotion(
      createProductPromotionInput,
    );
  }

  @Mutation(() => ProductPromotionType)
  updateProductPromotion(
    @Args() updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<IProductPromotion> {
    return this.productPromotionUseCases.updateProductPromotion(
      updateProductPromotionInput.id,
      updateProductPromotionInput,
    );
  }

  @Mutation(() => ProductPromotionType)
  removeProductPromotion(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductPromotion> {
    return this.productPromotionUseCases.removeProductPromotion(id);
  }
}
