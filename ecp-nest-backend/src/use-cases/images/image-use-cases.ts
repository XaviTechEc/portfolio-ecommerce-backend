import { Injectable } from '@nestjs/common';
import { IImageRepository } from 'src/core/abstracts/repositories';
import { CreateImageDto, UpdateImageDto } from 'src/core/dtos';
import { IImage } from 'src/core/entities';

@Injectable()
export class ImageUseCases implements IImageRepository<IImage> {
  getImagesBy(fields: Partial<IImage>): Promise<IImage[]> {
    throw new Error('Method not implemented.');
  }
  createImage(createImageDto: CreateImageDto): Promise<IImage> {
    throw new Error('Method not implemented.');
  }
  getImageById(id: string): Promise<IImage> {
    throw new Error('Method not implemented.');
  }
  updateImage(id: string, updateImageDto: UpdateImageDto): Promise<IImage> {
    throw new Error('Method not implemented.');
  }
  removeComment(id: string): Promise<IImage> {
    throw new Error('Method not implemented.');
  }
}
