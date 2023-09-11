import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { PromotionUseCases } from 'src/promotions/application/use-cases/promotion-use-cases';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';
import { PromotionType } from 'src/promotions/domain/object-types/promotion.type';

@Resolver(() => PromotionType)
export class PromotionResolver {
  constructor(private promotionUseCases: PromotionUseCases) {}

  @Query(() => [PromotionType], { name: 'promotions' })
  getAllPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IPromotion[]> {
    return this.promotionUseCases.getAllPromotions({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => PromotionType, { name: 'promotion' })
  getPromotionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IPromotion> {
    return this.promotionUseCases.getPromotionById(id);
  }

  @Mutation(() => PromotionType)
  createPromotion(
    @Args('createPromotionInput') createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion> {
    return this.promotionUseCases.createPromotion(createPromotionInput);
  }

  @Mutation(() => PromotionType)
  updatePromotion(
    @Args('updatePromotionInput') updatePromotionInput: UpdatePromotionInput,
  ): Promise<IPromotion> {
    return this.promotionUseCases.updatePromotion(
      updatePromotionInput.id,
      updatePromotionInput,
    );
  }

  @Mutation(() => PromotionType)
  removePromotion(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IPromotion> {
    return this.promotionUseCases.removePromotion(id);
  }
}
