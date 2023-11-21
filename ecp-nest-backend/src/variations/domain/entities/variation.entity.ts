import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

export class IVariation extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  name: string;
  category: ICategory;
}
