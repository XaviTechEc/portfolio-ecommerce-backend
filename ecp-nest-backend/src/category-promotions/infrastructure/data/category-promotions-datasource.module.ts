import { Module } from '@nestjs/common';
import { ICategoryPromotionsDataSourceService } from 'src/category-promotions/domain/abstracts/services/category-promotions-datasource.abstract.service';
import { CategoryPromotionsDataService } from './category-promotions-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryPromotion } from './postgresql/entities/CategoryPromotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryPromotion])],
  providers: [
    {
      provide: ICategoryPromotionsDataSourceService,
      useClass: CategoryPromotionsDataService,
    },
  ],
  exports: [ICategoryPromotionsDataSourceService, TypeOrmModule],
})
export class CategoryPromotionsDataSourceModule {}
