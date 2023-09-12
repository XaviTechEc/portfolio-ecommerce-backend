import { Module } from '@nestjs/common';
import { ICategoryDataSourceService } from 'src/categories/domain/abstracts/services/category-datasource.abstract.service';
import { CategoryDataSourceService } from './category-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './postgresql/entities/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: ICategoryDataSourceService,
      useClass: CategoryDataSourceService,
    },
  ],
  exports: [ICategoryDataSourceService, TypeOrmModule],
})
export class CategoryDataSourceModule {}
