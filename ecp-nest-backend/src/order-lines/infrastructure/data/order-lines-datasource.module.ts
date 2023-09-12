import { Module } from '@nestjs/common';
import { IOrderLinesDataSourceService } from 'src/order-lines/domain/abstracts/services/order-lines-datasource.abstract.service';
import { OrderLinesDataService } from './order-lines-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLine } from './postgresql/entities/OrderLine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  providers: [
    {
      provide: IOrderLinesDataSourceService,
      useClass: OrderLinesDataService,
    },
  ],
  exports: [IOrderLinesDataSourceService, TypeOrmModule],
})
export class OrderLinesDataSourceModule {}
