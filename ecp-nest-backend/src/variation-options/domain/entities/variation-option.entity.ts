import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IVariation } from 'src/variations/domain/entities/variation.entity';

export class IVariationOption extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  value: string;
  variation: IVariation;
}
