import { Injectable } from '@nestjs/common';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { ITag } from 'src/tags/domain/entities/tag.entity';

@Injectable()
export class TagFactoryService {
  createTag(createTagInput: CreateTagInput) {
    const newTag = new ITag();
    newTag.code = createTagInput.code;
    newTag.value = createTagInput.value;
    newTag.active = createTagInput.active;
    return newTag;
  }
  updateTag(updateTagInput: UpdateTagInput) {
    const newTag = new ITag();
    newTag.id = updateTagInput.id;
    newTag.code = updateTagInput.code;
    newTag.value = updateTagInput.value;
    newTag.active = updateTagInput.active;
    return newTag;
  }
}
