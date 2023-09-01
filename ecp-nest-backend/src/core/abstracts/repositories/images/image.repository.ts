import { CreateImageDto, UpdateImageDto } from 'src/core/dtos';

export abstract class IImageRepository<T> {
  abstract getImagesBy(fields: Partial<T>): Promise<T[]>;
  abstract getImageById(id: string): Promise<T>;
  abstract createImage(createImageDto: CreateImageDto): Promise<T>;
  abstract updateImage(id: string, updateImageDto: UpdateImageDto): Promise<T>;
  abstract removeComment(id: string): Promise<T>;
}
