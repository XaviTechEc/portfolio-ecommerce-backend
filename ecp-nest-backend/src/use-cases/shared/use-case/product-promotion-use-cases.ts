import { Injectable } from '@nestjs/common';
import { IProductPromotionRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductPromotion } from 'src/core/entities';
import { ProductPromotionFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
  PaginationArgs,
} from 'src/core/dtos';

@Injectable()
export class ProductPromotionUseCases
  implements IProductPromotionRepository<IProductPromotion>
{
  constructor(
    private dataService: IDataSourcesService,
    private productPromotionFactoryService: ProductPromotionFactoryService,
  ) {}
  getProductPromotionsBy(
    term: string,
    fields: (keyof IProductPromotion)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProductPromotion[]> {
    return this.dataService.productPromotions.getProductPromotionsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductPromotion(
    args?: IGenericArgs<IProductPromotion>,
  ): Promise<IProductPromotion[]> {
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
