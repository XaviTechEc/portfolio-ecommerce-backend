import { Module } from '@nestjs/common';
import { ImagesDataService } from './images.datasource.service';
import { IImagesDataSourceService } from 'src/images/domain/abstracts/services/images-datasource.abstract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './postgresql/entities/Image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [
    {
      provide: IImagesDataSourceService,
      useClass: ImagesDataService,
    },
  ],
  exports: [IImagesDataSourceService, TypeOrmModule],
})
export class ImagesDataSourceModule {}
