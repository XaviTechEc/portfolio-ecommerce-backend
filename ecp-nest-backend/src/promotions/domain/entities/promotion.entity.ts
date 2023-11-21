import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class IPromotion extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  description: string;
  percentageDiscount?: number;
  startDate?: Date;
  endDate?: Date;
}
