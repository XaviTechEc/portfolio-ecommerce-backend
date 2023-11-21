import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IShoppingCart extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  user: IUser;
}
