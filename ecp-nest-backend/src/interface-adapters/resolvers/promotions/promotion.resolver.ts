import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/core/dtos';
import { IPromotion } from 'src/core/entities';
import { PromotionType } from 'src/core/object-types';
import { PromotionUseCases } from 'src/use-cases';

@Resolver(() => PromotionType)
export class PromotionResolver {
  constructor(private promotionUseCases: PromotionUseCases) {}

  @Query(() => [PromotionType], { name: 'promotions' })
  getAllPromotion(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IPromotion>,
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
    @Args() createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion> {
    return this.promotionUseCases.createPromotion(createPromotionInput);
  }

  @Mutation(() => PromotionType)
  updatePromotion(
    @Args() updatePromotionInput: UpdatePromotionInput,
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
