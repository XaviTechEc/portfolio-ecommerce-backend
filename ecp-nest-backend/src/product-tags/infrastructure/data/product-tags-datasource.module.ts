import { Module } from '@nestjs/common';
import { IProductTagsDataSourceService } from 'src/product-tags/domain/abstracts/services/product-tags-datasource.abstract.service';
import { ProductTagsDataService } from './product-tags-datasource.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './postgresql/entities/ProductTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag])],
  providers: [
    {
      provide: IProductTagsDataSourceService,
      useClass: ProductTagsDataService,
    },
  ],
  exports: [IProductTagsDataSourceService],
})
export class ProductTagsDataSourceModule {}
