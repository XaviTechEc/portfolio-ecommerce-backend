import { IAddress } from '../addresses/address.entity';
import { IUser } from '../users/user.entity';

export class IUserAddress {
  id: string;
  isDefault?: boolean;
  user: IUser;
  address: IAddress;
}
