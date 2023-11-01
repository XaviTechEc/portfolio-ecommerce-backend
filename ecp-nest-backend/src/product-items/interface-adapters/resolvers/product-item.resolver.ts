import { ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ProductConfigurationUseCases } from 'src/product-configurations/application/use-cases/product-configuration-use-cases';
import { ProductItemUseCases } from 'src/product-items/application/use-cases/product-item-use-cases';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { VariationOptionType } from 'src/variation-options/domain/object-types/variation-option.type';

@Resolver(() => ProductItemType)
export class ProductItemResolver {
  constructor(
    private productItemUseCases: ProductItemUseCases,
    private productConfigurationUseCases: ProductConfigurationUseCases,
  ) {}

  @Query(() => [ProductItemType], { name: 'productItems' })
  getAllProductItems(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ) {
    return this.productItemUseCases.getAllProductItems({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => [ProductItemType], { name: 'productItemsByProduct' })
  getProductItemsByProduct(
    @Args({ name: 'term', type: () => String }) term: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productItemUseCases.getProductItemsBy(
      term,
      ['product'],
      paginationArgs,
    );
  }

  @Query(() => ProductItemType, { name: 'productItem' })
  getProductItemById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ) {
    return this.productItemUseCases.getProductItemById(id);
  }

  @Mutation(() => ProductItemType)
  createProductItem(
    @Args('createProductItemInput')
    createProductItemInput: CreateProductItemInput,
  ) {
    return this.productItemUseCases.createProductItem(createProductItemInput);
  }

  @Mutation(() => ProductItemType)
  updateProductItem(
    @Args('updateProductItemInput')
    updateProductItemInput: UpdateProductItemInput,
  ) {
    return this.productItemUseCases.updateProductItem(
      updateProductItemInput.id,
      updateProductItemInput,
    );
  }

  @Mutation(() => ProductItemType)
  removeProductItem(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.productItemUseCases.removeProductItem(id);
  }

  // === Resolve Fields ===
  @ResolveField(() => [VariationOptionType], { name: 'variationOptions' })
  getAllVariationOptions(
    @Parent() productItem: ProductItemType,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.productConfigurationUseCases.getProductConfigurationsBy(
      productItem.id,
      ['productItem'],
      paginationArgs,
    );
  }
}
