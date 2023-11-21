import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { ITagsDataSourceService } from 'src/tags/domain/abstracts/services/tags-datasource.abstract.service';
import {
  CreateTagInput,
  UpdateTagInput,
} from 'src/tags/domain/dtos/graphql/inputs/tag.input';
import { ITag } from 'src/tags/domain/entities/tag.entity';
import { TagFactoryService } from './factory/tag-factory.service';

@Injectable()
export class TagUseCases {
  constructor(
    private dataServices: ITagsDataSourceService,
    private tagFactoryService: TagFactoryService,
  ) {}

  getMany(props: GetManyProps<ITag>) {
    return this.dataServices.tags.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.tags.getOneById({ ...props });
  }

  create(props: CreateProps<CreateTagInput>) {
    const newTag = this.tagFactoryService.createTag(props.data);
    return this.dataServices.tags.create({ ...props, data: newTag });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateTagInput>) {
    const newTag = this.tagFactoryService.updateTag(props.data);
    return this.dataServices.tags.updateOneById({
      ...props,
      data: newTag,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.tags.deleteOneById({ ...props });
  }
}
