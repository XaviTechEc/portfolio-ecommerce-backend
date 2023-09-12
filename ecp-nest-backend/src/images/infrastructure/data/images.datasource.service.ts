import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ImagesRepository } from './postgresql/repositories/images.repository';
import { Image } from './postgresql/entities/Image.entity';
import { IImagesDataSourceService } from 'src/images/domain/abstracts/services/images-datasource.abstract.service';

@Injectable()
export class ImagesDataService
  implements IImagesDataSourceService, OnApplicationBootstrap
{
  // Images
  images: ImagesRepository;

  constructor(
    // Images
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Images
    this.images = new ImagesRepository(
      this.imagesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
