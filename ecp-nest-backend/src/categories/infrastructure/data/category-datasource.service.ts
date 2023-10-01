import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { Category } from './postgresql/entities/Category.entity';
import { CategoriesRepository } from './postgresql/repositories/categories.repository';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ICategoryDataSourceService } from 'src/categories/domain/abstracts/services/category-datasource.abstract.service';

@Injectable()
export class CategoryDataSourceService
  implements ICategoryDataSourceService, OnApplicationBootstrap
{
  // Categories
  categories: CategoriesRepository;

  constructor(
    // Categories
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Categories
    this.categories = new CategoriesRepository(
      this.categoriesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
