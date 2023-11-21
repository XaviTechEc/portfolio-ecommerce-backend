import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { VariationUseCases } from 'src/variations/application/use-cases/variation-use-cases';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/variations/domain/dtos/graphql/inputs/variation.input';
import { VariationType } from 'src/variations/interface-adapters/graphql/object-types/variation.type';

@Resolver(() => VariationType)
export class VariationResolver extends BaseResolver(VariationType, {
  useCasesRef: VariationUseCases,
  createInputRef: CreateVariationInput,
  updateInputRef: UpdateVariationInput,
}) {
  constructor(private variationUseCases: VariationUseCases) {
    super(variationUseCases);
  }
}
