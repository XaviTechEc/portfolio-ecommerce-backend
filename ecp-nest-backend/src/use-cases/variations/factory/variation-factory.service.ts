import { Injectable } from '@nestjs/common';
import { CreateVariationInput, UpdateVariationInput } from 'src/core/dtos';
import { IVariation } from 'src/core/entities';

@Injectable()
export class VariationFactoryService {
  createVariation(createVariationInput: CreateVariationInput) {
    const newVariation = new IVariation();
    newVariation.categoryId = createVariationInput.categoryId;
    newVariation.name = createVariationInput.name;
    return newVariation;
  }
  updateVariation(updateVariationInput: UpdateVariationInput) {
    const newVariation = new IVariation();
    newVariation.categoryId = updateVariationInput.categoryId;
    newVariation.name = updateVariationInput.name;
    return newVariation;
  }
}
