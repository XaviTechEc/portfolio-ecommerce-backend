import { IComment } from '../../entities/comment.entity';
import { ICommentsRepository } from '../repositories/comments.repository';

export abstract class ICommentsDataSourceService {
  // Comments
  abstract comments: ICommentsRepository<IComment>;
}
