import { IVariation } from 'src/variations/domain/entities/variation.entity';

export class IVariationOption {
  id: string;
  value: string;
  variation: IVariation;
}
