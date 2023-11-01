import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductPromotionsDataSourceService } from 'src/product-promotions/domain/abstracts/services/product-promotions-datasource.abstract.service';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import { IProductPromotion } from 'src/product-promotions/domain/entities/product-promotion.entity';
import { ProductPromotionFactoryService } from './factory/product-promotion-factory.service';

@Injectable()
export class ProductPromotionUseCases {
  constructor(
    private dataService: IProductPromotionsDataSourceService,
    private productPromotionFactoryService: ProductPromotionFactoryService,
  ) {}
  getProductPromotionsBy(
    term: string,
    fields: (keyof IProductPromotion)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.productPromotions.getProductPromotionsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductPromotion(args?: IGenericArgs<IProductPromotion>) {
    return this.dataService.productPromotions.getAllProductPromotion(args);
  }
  getProductPromotionById(id: string): Promise<IProductPromotion> {
    return this.dataService.productPromotions.getProductPromotionById(id);
  }
  createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<IProductPromotion> {
    const productPromotion =
      this.productPromotionFactoryService.createProductPromotion(
        createProductPromotionInput,
      );
    return this.dataService.productPromotions.createProductPromotion(
      productPromotion,
    );
  }
  updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<IProductPromotion> {
    const productPromotion =
      this.productPromotionFactoryService.updateProductPromotion(
        updateProductPromotionInput,
      );
    return this.dataService.productPromotions.updateProductPromotion(
      id,
      productPromotion,
    );
  }
  removeProductPromotion(id: string): Promise<IProductPromotion> {
    return this.dataService.productPromotions.removeProductPromotion(id);
  }
}
