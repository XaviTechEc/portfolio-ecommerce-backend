import { Module } from '@nestjs/common';
import { IProductCategoriesDataSourceService } from 'src/product-categories/domain/abstracts/services/product-categories-datasource.abstract.service';
import { ProductCategoriesDataService } from './product-categories-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './postgresql/entities/ProductCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [
    {
      provide: IProductCategoriesDataSourceService,
      useClass: ProductCategoriesDataService,
    },
  ],
  exports: [IProductCategoriesDataSourceService],
})
export class ProductCategoriesDataSourceModule {}
