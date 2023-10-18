import { Injectable } from '@nestjs/common';
import { IFilesDataSourceService } from 'src/files/domain/abstracts/files-datasource.abstract.service';
import { ValidFileDestination } from 'src/files/domain/interfaces/valid-file-destination.type';

@Injectable()
export class FilesUseCases<T> {
  constructor(private dataService: IFilesDataSourceService<T>) {}
  async save(file: T, destination: ValidFileDestination): Promise<string> {
    return this.dataService.files.save(file, destination);
  }
  async remove(
    name: string,
    destination: ValidFileDestination,
  ): Promise<boolean> {
    return this.dataService.files.remove(name, destination);
  }
  async findByName(
    name: string,
    destination: ValidFileDestination,
  ): Promise<string> {
    return this.dataService.files.findByName(name, destination);
  }
  async findAll(): Promise<T[]> {
    return this.dataService.files.findAll();
  }
}
