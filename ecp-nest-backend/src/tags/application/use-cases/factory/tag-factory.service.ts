import { Injectable } from '@nestjs/common';
import { CreateTagInput, UpdateTagInput } from 'src/core/dtos';
import { ITag } from 'src/core/entities';

@Injectable()
export class TagFactoryService {
  createTag(createTagInput: CreateTagInput) {
    const newTag = new ITag();
    newTag.code = createTagInput.code;
    newTag.value = createTagInput.value;
    return newTag;
  }
  updateTag(updateTagInput: UpdateTagInput) {
    const newTag = new ITag();
    newTag.code = updateTagInput.code;
    newTag.value = updateTagInput.value;
    return newTag;
  }
}
