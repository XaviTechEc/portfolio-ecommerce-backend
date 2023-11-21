import { Module } from '@nestjs/common';
import { ICategoriesDataSourceService } from 'src/categories/domain/abstracts/services/categories-datasource.abstract.service';
import { CategoryDataSourceService } from './category-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './postgresql/entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: ICategoriesDataSourceService,
      useClass: CategoryDataSourceService,
    },
  ],
  exports: [ICategoriesDataSourceService, TypeOrmModule],
})
export class CategoryDataSourceModule {}
