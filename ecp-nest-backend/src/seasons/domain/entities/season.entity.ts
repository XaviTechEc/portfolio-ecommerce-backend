import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class ISeason extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
}
