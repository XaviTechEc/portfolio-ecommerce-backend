import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { VariationOptionUseCases } from 'src/variation-options/application/use-cases/variation-option-use-cases';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';
import { VariationOptionType } from 'src/variation-options/domain/object-types/variation-option.type';

@Resolver(() => VariationOptionType)
export class VariationOptionResolver {
  constructor(private variationOptionUseCases: VariationOptionUseCases) {}

  @Query(() => [VariationOptionType], { name: 'variationOptions' })
  getAllVariationOption(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IVariationOption[]> {
    return this.variationOptionUseCases.getAllVariationOptions({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [VariationOptionType], { name: 'variationOptionsByVariation' })
  getVariationOptionsByVariation(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IVariationOption[]> {
    return this.variationOptionUseCases.getVariationOptionsBy(
      term,
      ['variation'],
      paginationArgs,
    );
  }

  @Query(() => VariationOptionType, { name: 'variationOption' })
  getVariationOptionById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.getVariationOptionById(id);
  }

  @Mutation(() => VariationOptionType)
  createVariationOption(
    @Args('createVariationOptionInput')
    createVariationOptionInput: CreateVariationOptionInput,
  ): Promise<IVariationOption> {
    return this.variationOptionUseCases.createVariationOption(
      createVariationOptionInput,
    );
  }

  @Mutation(() => VariationOptionType)
  updateVariationOption(
    @Args('updateVariationOptionInput')
    updateVariationOptionInput: UpdateVariationOptionInput,
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
