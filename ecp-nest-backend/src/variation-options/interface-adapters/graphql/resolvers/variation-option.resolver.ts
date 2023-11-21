import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/common/interface-adapters/graphql/resolvers/base-resolver.resolver';
import { VariationOptionUseCases } from 'src/variation-options/application/use-cases/variation-option-use-cases';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { VariationOptionType } from 'src/variation-options/interface-adapters/graphql/object-types/variation-option.type';

@Resolver(() => VariationOptionType)
export class VariationOptionResolver extends BaseResolver(VariationOptionType, {
  useCasesRef: VariationOptionUseCases,
  createInputRef: CreateVariationOptionInput,
  updateInputRef: UpdateVariationOptionInput,
}) {
  constructor(private variationOptionUseCases: VariationOptionUseCases) {
    super(variationOptionUseCases);
  }
}
