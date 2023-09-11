import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ImagesRepository } from './postgresql/repositories/images.repository';
import { Image } from './postgresql/entities/Image.entity';

export class ImagesDataService implements OnApplicationBootstrap {
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
