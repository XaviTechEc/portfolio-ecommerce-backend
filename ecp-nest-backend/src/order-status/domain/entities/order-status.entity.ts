import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { StatusValue } from '../enums/status-value.enum';

export class IOrderStatus extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  statusValue: StatusValue;
}
