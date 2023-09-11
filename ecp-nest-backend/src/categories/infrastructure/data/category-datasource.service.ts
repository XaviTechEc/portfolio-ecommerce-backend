import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { Category } from './postgresql/entities/Category.entity';
import { CategoriesRepository } from './postgresql/repositories/categories.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryDataSourceService {
  // Categories
  categories: CategoriesRepository;

  constructor(
    // Categories
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
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
