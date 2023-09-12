import { ITag } from '../../entities/tag.entity';
import { ITagsRepository } from '../repositories/tags.repository';

export abstract class ITagsDataSourceService {
  abstract tags: ITagsRepository<ITag>;
}
