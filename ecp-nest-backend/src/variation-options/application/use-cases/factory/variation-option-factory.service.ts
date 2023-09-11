import { Injectable } from '@nestjs/common';
import {
  CreateVariationOptionInput,
  UpdateVariationOptionInput,
} from 'src/core/dtos';
import { IVariationOption } from 'src/core/entities';

@Injectable()
export class VariationOptionFactoryService {
  createVariationOption(
    createVariationOptionInput: CreateVariationOptionInput,
  ) {
    const newVariationOption = new IVariationOption();
    newVariationOption.variation = createVariationOptionInput.variation;
    newVariationOption.value = createVariationOptionInput.value;
    return newVariationOption;
  }
  updateVariationOption(
    updateVariationOptionInput: UpdateVariationOptionInput,
  ) {
    const newVariationOption = new IVariationOption();
    newVariationOption.variation = updateVariationOptionInput.variation;
    newVariationOption.value = updateVariationOptionInput.value;
    return newVariationOption;
  }
}
