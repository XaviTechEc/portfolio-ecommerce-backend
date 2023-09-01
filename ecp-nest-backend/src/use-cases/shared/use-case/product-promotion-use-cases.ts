import { Injectable } from '@nestjs/common';
import { IProductPromotionRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductPromotion } from 'src/core/entities';
import { ProductPromotionFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/core/dtos';

@Injectable()
export class ProductPromotionUseCases
  implements IProductPromotionRepository<IProductPromotion>
{
  constructor(
    private dataService: IDataSourcesService,
    private productPromotionFactoryService: ProductPromotionFactoryService,
  ) {}
  getAllProductPromotion(
    args?: IGenericArgs<IProductPromotion>,
  ): Promise<IProductPromotion[]> {
    return this.dataService.productPromotions.getAllProductPromotion(args);
  }
  getOneProductPromotionById(id: string): Promise<IProductPromotion> {
    return this.dataService.productPromotions.getOneProductPromotionById(id);
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
  updateOneProductPromotionById(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<IProductPromotion> {
    const productPromotion =
      this.productPromotionFactoryService.updateProductPromotion(
        updateProductPromotionInput,
      );
    return this.dataService.productPromotions.updateOneProductPromotionById(
      id,
      productPromotion,
    );
  }
  deleteOneProductPromotionById(id: string): Promise<IProductPromotion> {
    return this.dataService.productPromotions.deleteOneProductPromotionById(id);
  }
}
