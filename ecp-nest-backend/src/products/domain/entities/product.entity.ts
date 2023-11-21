import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IProduct extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}
