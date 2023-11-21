import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ImagesRepository } from './postgresql/repositories/images.repository';
import { Image } from './postgresql/entities/Image.entity';
import { IImagesDataSourceService } from 'src/images/domain/abstracts/services/images-datasource.abstract.service';

@Injectable()
export class ImagesDataService
  implements IImagesDataSourceService, OnApplicationBootstrap
{
  // Images
  images: ImagesRepository<Image>;

  constructor(
    // Images
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Images
    this.images = new ImagesRepository(
      this.imagesRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name, 
      'image'
    );
  }
}
