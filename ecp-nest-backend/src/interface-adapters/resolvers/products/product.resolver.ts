import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Args, ID, Mutation, Query } from '@nestjs/graphql';
import {
  PaginationArgs,
  SearchArgs,
  CreateProductInput,
  UpdateProductInput,
} from 'src/core/dtos';
import { IProduct } from 'src/core/entities';
import { ProductType } from 'src/core/object-types';
import { ProductUseCases } from 'src/use-cases';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private productUseCases: ProductUseCases) {}

  @Query(() => [ProductType], { name: 'products' })
  getAllProduct(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs<IProduct>,
  ): Promise<IProduct[]> {
    return this.productUseCases.getAllProducts({
      paginationArgs,
      searchArgs,
    });
  }

  @Query(() => ProductType, { name: 'product' })
  getProductById(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProduct> {
    return this.productUseCases.getProductById(id);
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args() createProductInput: CreateProductInput,
  ): Promise<IProduct> {
    return this.productUseCases.createProduct(createProductInput);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args() updateProductInput: UpdateProductInput,
  ): Promise<IProduct> {
    return this.productUseCases.updateProduct(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => ProductType)
  removeProduct(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<IProduct> {
    return this.productUseCases.removeProduct(id);
  }
}
