import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { ProductTag } from './postgresql/entities/ProductTag.entity';
import { ProductTagsRepository } from './postgresql/repositories/product-tag.repository';
import { IProductTagsDataSourceService } from 'src/product-tags/domain/abstracts/services/product-tags-datasource.abstract.service';

@Injectable()
export class ProductTagsDataService
  implements IProductTagsDataSourceService, OnApplicationBootstrap
{
  productTags: ProductTagsRepository;

  constructor(
    @InjectRepository(ProductTag)
    private productTagsRepository: Repository<ProductTag>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productTags = new ProductTagsRepository(
      this.productTagsRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
