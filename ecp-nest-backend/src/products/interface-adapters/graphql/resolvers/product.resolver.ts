import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductUseCases } from 'src/products/application/use-cases/product-use-cases';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';

@Resolver(() => ProductType)
export class ProductResolver extends BaseResolver(ProductType, {
  useCasesRef: ProductUseCases,
  createInputRef: CreateProductInput,
  updateInputRef: UpdateProductInput,
}) {
  constructor(private productUseCases: ProductUseCases) {
    super(productUseCases);
  }
}
