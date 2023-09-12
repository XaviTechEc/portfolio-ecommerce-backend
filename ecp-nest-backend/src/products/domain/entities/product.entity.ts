import { IUser } from 'src/users/domain/entities/user.entity';

export class IProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  user: IUser;
}
