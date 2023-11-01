import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IImageRepository<T> {
  abstract getAllImages(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getImageById(id: string): Promise<T>;
  abstract createImage(data: T): Promise<T>;
  abstract updateImage(id: string, data: T): Promise<T>;
  abstract removeImage(id: string): Promise<T>;

  abstract getImagesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
