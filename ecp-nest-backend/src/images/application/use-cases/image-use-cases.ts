import { Injectable } from '@nestjs/common';
import { IImageRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import {
  CreateImageDto,
  IGenericArgs,
  PaginationArgs,
  UpdateImageDto,
} from 'src/core/dtos';
import { IImage } from 'src/core/entities';
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
