import { IGenericArgs } from 'src/core/dtos';

export abstract class IImageRepository<T> {
  abstract getAllImages(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getImageById(id: string): Promise<T>;
  abstract createImage(data: T): Promise<T>;
  abstract updateImage(id: string, data: T): Promise<T>;
  abstract removeImage(id: string): Promise<T>;
}
