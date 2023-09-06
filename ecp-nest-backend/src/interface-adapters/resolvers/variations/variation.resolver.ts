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

  @Query(() => VariationType, { name: 'variation' })
  getVariationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariation> {
    return this.variationUseCases.getVariationById(id);
  }

  @Mutation(() => VariationType)
  createVariation(
    @Args() createVariationInput: CreateVariationInput,
  ): Promise<IVariation> {
    return this.variationUseCases.createVariation(createVariationInput);
  }

  @Mutation(() => VariationType)
  updateVariation(
    @Args() updateVariationInput: UpdateVariationInput,
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
