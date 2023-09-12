import { Module } from '@nestjs/common';
import { IProductsDataSourceService } from 'src/products/domain/abstracts/services/products-datasource.abstract.service';
import { ProductsDataService } from './products-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './postgresql/entities/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    {
      provide: IProductsDataSourceService,
      useClass: ProductsDataService,
    },
  ],
  exports: [IProductsDataSourceService],
})
export class ProductsDataSourceModule {}
