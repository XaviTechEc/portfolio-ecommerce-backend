import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IReview extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  ratingValue: number;
  content?: string;
  visible?: boolean;
  user: IUser;
  orderLine: IOrderLine;
}
