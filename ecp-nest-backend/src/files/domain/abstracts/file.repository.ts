import { ValidFileDestination } from '../interfaces/valid-file-destination.type';

export abstract class IFileRepository<T> {
  abstract save(file: T, destination: ValidFileDestination): Promise<string>;
  abstract remove(
    name: string,
    destination: ValidFileDestination,
  ): Promise<boolean>;
  abstract findByName(
    name: string,
    destination: ValidFileDestination,
  ): Promise<string>;
  abstract findAll(): Promise<T[]>;
}
