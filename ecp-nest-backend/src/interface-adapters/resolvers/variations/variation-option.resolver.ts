import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';
import { VariationOptionType } from 'src/core/object-types';
import { VariationOptionUseCases } from 'src/use-cases';

@Resolver(() => VariationOptionType)
export class VariationOptionResolver {
  constructor(private variationOptionUseCases: VariationOptionUseCases) {}

  @Query(() => [VariationOptionType], { name: 'variationOptions' })
  getAllVariationOption(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IVariationOption>,
  ): Promise<IVariationOption[]> {
    return this.variationOptionUseCases.getAllVariationOptions({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => VariationOptionType, { name: 'variationOption' })
  getVariationOptionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.getVariationOptionById(id);
  }

  @Mutation(() => VariationOptionType)
  createVariationOption(
    @Args() createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.createVariationOption(
      createVariationOptionInput,
    );
  }

  @Mutation(() => VariationOptionType)
  updateVariationOption(
    @Args() updateVariationOptionInput: UpdateVariationOptionInput,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.updateVariationOption(
      updateVariationOptionInput.id,
      updateVariationOptionInput,
    );
  }

  @Mutation(() => VariationOptionType)
  removeVariationOption(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.removeVariationOption(id);
  }
}
