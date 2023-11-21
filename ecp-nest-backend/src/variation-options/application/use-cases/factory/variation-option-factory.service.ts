import { Injectable } from '@nestjs/common';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/variation-options/domain/dtos/graphql/inputs/variation-option.input';
import { IVariationOption } from 'src/variation-options/domain/entities/variation-option.entity';

@Injectable()
export class VariationOptionFactoryService {
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ) {
    const newVariationOption = new IVariationOption();
    newVariationOption.variation = createVariationOptionInput.variation;
    newVariationOption.value = createVariationOptionInput.value;
    newVariationOption.active = createVariationOptionInput.active;
    return newVariationOption;
  }
  updateVariationOption(
    updateVariationOptionInput: UpdateVariationOptionInput,
  ) {
    const newVariationOption = new IVariationOption();
    newVariationOption.id = updateVariationOptionInput.id;
    newVariationOption.variation = updateVariationOptionInput.variation;
    newVariationOption.value = updateVariationOptionInput.value;
    return newVariationOption;
  }
}
