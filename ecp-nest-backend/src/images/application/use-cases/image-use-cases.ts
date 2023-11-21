import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { PaginationArgs } from 'src/common/domain/dtos/graphql/args';
import { IImagesDataSourceService } from 'src/images/domain/abstracts/services/images-datasource.abstract.service';
import {
  CreateImageInput,
  UpdateImageInput,
} from 'src/images/domain/dtos/graphql/inputs/image.input';
import { IImage } from 'src/images/domain/entities/image.entity';
import { ImageFactoryService } from './image-factory.service';

@Injectable()
export class ImageUseCases {
  constructor(
    private dataServices: IImagesDataSourceService,
    private imageFactoryService: ImageFactoryService,
  ) {}

  getMany(props: GetManyProps<IImage>) {
    return this.dataServices.images.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.images.getOneById({ ...props });
  }

  create(props: CreateProps<CreateImageInput>) {
    const newImage = this.imageFactoryService.createImage(props.data);
    return this.dataServices.images.create({ ...props, data: newImage });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateImageInput>) {
    const newImage = this.imageFactoryService.updateImage(props.data);
    return this.dataServices.images.updateOneById({
      ...props,
      data: newImage,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.images.deleteOneById({ ...props });
  }

  getImagesBy(
    term: string,
    fields: (keyof IImage)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataServices.images.getImagesBy(term, fields, paginationArgs);
  }
}
