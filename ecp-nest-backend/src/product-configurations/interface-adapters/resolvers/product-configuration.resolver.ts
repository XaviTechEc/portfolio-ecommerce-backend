import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductConfigurationUseCases } from 'src/product-configurations/application/use-cases/product-configuration-use-cases';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import { IProductConfiguration } from 'src/product-configurations/domain/entities/product-configuration.entity';
import { ProductConfigurationType } from 'src/product-configurations/domain/object-types/product-configuration.type';

@Resolver(() => ProductConfigurationType)
export class ProductConfigurationResolver {
  constructor(
    private productConfigurationUseCases: ProductConfigurationUseCases,
  ) {}

  @Query(() => [ProductConfigurationType], { name: 'productConfigurations' })
  getAllProductConfiguration(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<IProductConfiguration[]> {
    return this.productConfigurationUseCases.getAllProductConfiguration({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductConfigurationType], {
    name: 'productConfigurationsByProductItem',
  })
  getProductConfigurationsByProductItem(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductConfiguration[]> {
    return this.productConfigurationUseCases.getProductConfigurationsBy(
      term,
      ['productItem'],
      paginationArgs,
    );
  }

  @Query(() => [ProductConfigurationType], {
    name: 'productConfigurationsByVariationOption',
  })
  getProductConfigurationsByVariationOption(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<IProductConfiguration[]> {
    return this.productConfigurationUseCases.getProductConfigurationsBy(
      term,
      ['variationOption'],
      paginationArgs,
    );
  }

  @Query(() => ProductConfigurationType, { name: 'productConfiguration' })
  getProductConfigurationById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductConfiguration> {
    return this.productConfigurationUseCases.getProductConfigurationById(id);
  }

  @Mutation(() => ProductConfigurationType)
  createProductConfiguration(
    @Args('createProductConfigurationInput')
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<IProductConfiguration> {
    return this.productConfigurationUseCases.createProductConfiguration(
      createProductConfigurationInput,
    );
  }

  @Mutation(() => ProductConfigurationType)
  updateProductConfiguration(
    @Args('updateProductConfigurationInput')
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<IProductConfiguration> {
    return this.productConfigurationUseCases.updateProductConfiguration(
      updateProductConfigurationInput.id,
      updateProductConfigurationInput,
    );
  }

  @Mutation(() => ProductConfigurationType)
  removeProductConfiguration(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProductConfiguration> {
    return this.productConfigurationUseCases.removeProductConfiguration(id);
  }
}
