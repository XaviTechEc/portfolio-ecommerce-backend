import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { ProductConfigurationUseCases } from 'src/product-configurations/application/use-cases/product-configuration-use-cases';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import { ProductConfigurationType } from 'src/product-configurations/interface-adapters/graphql/object-types/product-configuration.type';

@Resolver(() => ProductConfigurationType)
export class ProductConfigurationResolver extends BaseResolver(
  ProductConfigurationType,
  {
    useCasesRef: ProductConfigurationUseCases,
    createInputRef: CreateProductConfigurationInput,
    updateInputRef: UpdateProductConfigurationInput,
  },
) {
  constructor(
    private productConfigurationUseCases: ProductConfigurationUseCases,
  ) {
    super(productConfigurationUseCases);
  }
}
