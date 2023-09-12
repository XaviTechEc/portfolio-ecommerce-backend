import { IUser } from 'src/users/domain/entities/user.entity';

export class IShoppingCart {
  id: string;
  user: IUser;
}
