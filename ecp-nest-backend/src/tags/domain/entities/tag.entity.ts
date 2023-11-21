import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class ITag extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  code: string;
  value: string;
}
