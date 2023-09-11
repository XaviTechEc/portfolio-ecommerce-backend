import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IUserAddress {
  id: string;
  isDefault?: boolean;
  user: IUser;
  address: IAddress;
}
