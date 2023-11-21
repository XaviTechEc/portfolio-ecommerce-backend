import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class IStore extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  name: string;
  description?: string;
  slug: string;
}
