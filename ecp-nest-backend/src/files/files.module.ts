import { Module } from '@nestjs/common';
import { FileController } from './interface-adapters/controllers/file.controller';
import { FilesDataSourceModule } from './infrastructure/data/files-datasource.module';
import { FilesUseCases } from './application/use-cases/files-use-cases';
import { ValidFileDestinationPipe } from './domain/pipes/valid-file-destination.pipe';

@Module({
  imports: [FilesDataSourceModule],
  providers: [FilesUseCases, ValidFileDestinationPipe],
  controllers: [FileController],
})
export class FilesModule {}
