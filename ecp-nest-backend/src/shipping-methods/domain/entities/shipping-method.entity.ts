import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class IShippingMethod extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  name: string;
  price: number;
}
