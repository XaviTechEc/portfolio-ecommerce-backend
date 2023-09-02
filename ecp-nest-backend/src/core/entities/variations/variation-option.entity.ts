import { IVariation } from './variation.entity';

export class IVariationOption {
  id: string;
  value: string;
  variation: IVariation;
}
