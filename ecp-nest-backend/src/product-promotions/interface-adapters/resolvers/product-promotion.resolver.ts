import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductPromotionUseCases } from 'src/product-promotions/application/use-cases/product-promotion-use-cases';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import { ProductPromotionType } from 'src/product-promotions/domain/object-types/product-promotion.type';

@Resolver(() => ProductPromotionType)
export class ProductPromotionResolver {
  constructor(private productPromotionUseCases: ProductPromotionUseCases) {}

  @Query(() => [ProductPromotionType], { name: 'productPromotions' })
  getAllProductPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.productPromotionUseCases.getAllProductPromotion({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductPromotionType], { name: 'productPromotionsByProduct' })
  getProductPromotionByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
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
  ) {
    return this.productPromotionUseCases.getProductPromotionsBy(
      term,
      ['promotion'],
      paginationArgs,
    );
  }

  @Query(() => ProductPromotionType, { name: 'productPromotion' })
  getProductPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.productPromotionUseCases.getProductPromotionById(id);
  }

  @Mutation(() => ProductPromotionType)
  createProductPromotion(
    @Args('createProductPromotionInput')
    createProductPromotionInput: CreateProductPromotionInput,
  ) {
    return this.productPromotionUseCases.createProductPromotion(
      createProductPromotionInput,
    );
  }

  @Mutation(() => ProductPromotionType)
  updateProductPromotion(
    @Args('updateProductPromotionInput')
    updateProductPromotionInput: UpdateProductPromotionInput,
  ) {
    return this.productPromotionUseCases.updateProductPromotion(
      updateProductPromotionInput.id,
      updateProductPromotionInput,
    );
  }

  @Mutation(() => ProductPromotionType)
  removeProductPromotion(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.productPromotionUseCases.removeProductPromotion(id);
  }
}
