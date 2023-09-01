export abstract class IImageRepository<T> {
  abstract getImagesBy(): Promise<T[]>;
  abstract getImageById(id: string): Promise<T>;
  abstract createImage(data: T): Promise<T>;
  abstract updateImage(id: string, data: T): Promise<T>;
  abstract removeComment(id: string): Promise<T>;
}
