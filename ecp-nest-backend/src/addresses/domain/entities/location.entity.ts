import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class ILocation extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  lat: number;
  lng: number;
}
