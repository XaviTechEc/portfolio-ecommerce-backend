import { Module } from '@nestjs/common';
import { IPromotionsDataSourceService } from 'src/promotions/domain/abstracts/services/promotions-datasource.abstract.service';
import { PromotionsDataService } from './promotions-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './postgresql/entities/Promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  providers: [
    {
      provide: IPromotionsDataSourceService,
      useClass: PromotionsDataService,
    },
  ],
  exports: [IPromotionsDataSourceService, TypeOrmModule],
})
export class PromotionsDataSourceModule {}
