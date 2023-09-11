import { Module } from '@nestjs/common';
import { IProductPromotionsDataSourceService } from 'src/product-promotions/domain/abstracts/services/product-promotions-datasource.abstract.service';
import { ProductPromotionsDataService } from './product-promotions-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPromotion } from './postgresql/entities/ProductPromotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPromotion])],
  providers: [
    {
      provide: IProductPromotionsDataSourceService,
      useClass: ProductPromotionsDataService,
    },
  ],
  exports: [IProductPromotionsDataSourceService],
})
export class ProductPromotionsDataSourceModule {}
