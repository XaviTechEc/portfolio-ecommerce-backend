import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IUserAddress extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  isDefault?: boolean;
  user: IUser;
  address: IAddress;
}
