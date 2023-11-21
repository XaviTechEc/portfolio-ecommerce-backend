import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class ICountry extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  code: string;
  longName: string;
}
