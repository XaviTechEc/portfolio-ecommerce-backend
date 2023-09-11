import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IImageRepository } from 'src/images/domain/abstracts/repositories/image.repository';
import {
  CreateImageDto,
  UpdateImageDto,
} from 'src/images/domain/dtos/rest/image.dto';
import { IImage } from 'src/images/domain/entities/image.entity';
import { ImageFactoryService } from './image-factory.service';

@Injectable()
export class ImageUseCases implements IImageRepository<IImage> {
  constructor(
    private dataService: IDataSourcesService,
    private imageFactoryService: ImageFactoryService,
  ) {}
  getImagesBy(
    term: string,
    fields: (keyof IImage)[],
    paginationArgs: PaginationArgs,
  ): Promise<IImage[]> {
    return this.dataService.images.getImagesBy(term, fields, paginationArgs);
  }
  getAllImages(args?: IGenericArgs<IImage>): Promise<IImage[]> {
    return this.dataService.images.getAllImages(args);
  }
  getImageById(id: string): Promise<IImage> {
    return this.dataService.images.getImageById(id);
  }
  createImage(createImageDto: CreateImageDto): Promise<IImage> {
    const image = this.imageFactoryService.createImage(createImageDto);
    return this.dataService.images.createImage(image);
  }

  updateImage(id: string, updateImageDto: UpdateImageDto): Promise<IImage> {
    const image = this.imageFactoryService.updateImage(updateImageDto);
    return this.dataService.images.updateImage(id, image);
  }
  removeImage(id: string): Promise<IImage> {
    return this.dataService.images.removeImage(id);
  }
}
