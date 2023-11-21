import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { ProductTag } from './postgresql/entities/ProductTag.entity';
import { ProductTagsPostgresRepository } from './postgresql/repositories/product-tag.repository';
import { IProductTagsDataSourceService } from 'src/product-tags/domain/abstracts/services/product-tags-datasource.abstract.service';

@Injectable()
export class ProductTagsDataService
  implements IProductTagsDataSourceService, OnApplicationBootstrap
{
  productTags: ProductTagsPostgresRepository<ProductTag>;

  constructor(
    @InjectRepository(ProductTag)
    private productTagsPostgresRepository: Repository<ProductTag>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.productTags = new ProductTagsPostgresRepository(
      this.productTagsPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'product_tag',
    );
  }
}
