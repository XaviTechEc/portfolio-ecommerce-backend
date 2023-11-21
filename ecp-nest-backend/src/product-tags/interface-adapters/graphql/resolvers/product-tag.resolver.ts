import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductTagUseCases } from 'src/product-tags/application/use-cases/product-tag-use-cases';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import { ProductTagType } from 'src/product-tags/interface-adapters/graphql/object-types/product-tag.type';

@Resolver(() => ProductTagType)
export class ProductTagResolver extends BaseResolver(ProductTagType, {
  useCasesRef: ProductTagUseCases,
  createInputRef: CreateProductTagInput,
  updateInputRef: UpdateProductTagInput,
}) {
  constructor(private productTagUseCases: ProductTagUseCases) {
    super(productTagUseCases);
  }
}
