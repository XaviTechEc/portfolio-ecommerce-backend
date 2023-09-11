import { Module } from '@nestjs/common';
import { IProductItemsDataSourceService } from 'src/product-items/domain/abstracts/services/product-items-datasource.abstract.service';
import { ProductItemsDataService } from './product-item-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductItem } from './postgresql/entities/ProductItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductItem])],
  providers: [
    {
      provide: IProductItemsDataSourceService,
      useClass: ProductItemsDataService,
    },
  ],
  exports: [IProductItemsDataSourceService],
})
export class ProductItemsDataSourceModule {}
