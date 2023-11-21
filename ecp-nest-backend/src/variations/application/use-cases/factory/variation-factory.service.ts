import { Injectable } from '@nestjs/common';
import {
  CreateVariationInput,
  UpdateVariationInput,
} from 'src/variations/domain/dtos/graphql/inputs/variation.input';
import { IVariation } from 'src/variations/domain/entities/variation.entity';

@Injectable()
export class VariationFactoryService {
  createVariation(createVariationInput: CreateVariationInput) {
    const newVariation = new IVariation();
    newVariation.category = createVariationInput.category;
    newVariation.name = createVariationInput.name;
    newVariation.active = createVariationInput.active;
    return newVariation;
  }
  updateVariation(updateVariationInput: UpdateVariationInput) {
    const newVariation = new IVariation();
    newVariation.id = updateVariationInput.id;
    newVariation.category = updateVariationInput.category;
    newVariation.name = updateVariationInput.name;
    newVariation.active = updateVariationInput.active;
    return newVariation;
  }
}
