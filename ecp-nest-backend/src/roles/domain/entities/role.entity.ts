import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class IRole extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  value: string;
}
