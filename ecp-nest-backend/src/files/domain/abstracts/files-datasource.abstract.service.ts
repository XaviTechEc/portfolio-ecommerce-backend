import { IFileRepository } from './file.repository';

export abstract class IFilesDataSourceService<T> {
  abstract files: IFileRepository<T>;
}
