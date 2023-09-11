import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/core/dtos';
import { IVariation } from 'src/core/entities';
import { VariationType } from 'src/core/object-types';
import { VariationUseCases } from 'src/use-cases';

@Resolver(() => VariationType)
export class VariationResolver {
  constructor(private variationUseCases: VariationUseCases) {}

  @Query(() => [VariationType], { name: 'variations' })
  getAllVariation(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IVariation[]> {
    return this.variationUseCases.getAllVariations({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [VariationType], { name: 'variationsByCategory' })
  getVariationsByCategory(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IVariation[]> {
    return this.variationUseCases.getVariationsBy(
      term,
      ['category'],
      paginationArgs,
    );
  }

  @Query(() => VariationType, { name: 'variation' })
  getVariationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariation> {
    return this.variationUseCases.getVariationById(id);
  }

  @Mutation(() => VariationType)
  createVariation(
    @Args('createVariationInput') createVariationInput: CreateVariationInput,
  ): Promise<IVariation> {
    return this.variationUseCases.createVariation(createVariationInput);
  }

  @Mutation(() => VariationType)
  updateVariation(
    @Args('updateVariationInput') updateVariationInput: UpdateVariationInput,
  ): Promise<IVariation> {
    return this.variationUseCases.updateVariation(
      updateVariationInput.id,
      updateVariationInput,
    );
  }

  @Mutation(() => VariationType)
  removeVariation(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariation> {
    return this.variationUseCases.removeVariation(id);
  }
}
