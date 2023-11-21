import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IComment extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  content: string;
  review: IReview;
  user: IUser;
  comment?: IComment;
}
