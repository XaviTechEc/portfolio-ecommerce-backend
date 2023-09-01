import { Injectable } from '@nestjs/common';
import { ICategoryPromotionRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { ICategoryPromotion } from 'src/core/entities';
import { CategoryPromotionFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';

@Injectable()
export class CategoryPromotionUseCases
  implements ICategoryPromotionRepository<ICategoryPromotion>
{
  constructor(
    private dataService: IDataSourcesService,
    private categoryPromotionFactoryService: CategoryPromotionFactoryService,
  ) {}
  getAllCategoryPromotion(
    args?: IGenericArgs<ICategoryPromotion>,
  ): Promise<ICategoryPromotion[]> {
    return this.dataService.categoryPromotions.getAllCategoryPromotion(args);
  }
  getOneCategoryPromotionById(id: string): Promise<ICategoryPromotion> {
    return this.dataService.categoryPromotions.getOneCategoryPromotionById(id);
  }
  createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    const categoryPromotion =
      this.categoryPromotionFactoryService.createCategoryPromotion(
        createCategoryPromotionInput,
      );
    return this.dataService.categoryPromotions.createCategoryPromotion(
      categoryPromotion,
    );
  }
  updateOneCategoryPromotionById(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    const categoryPromotion =
      this.categoryPromotionFactoryService.updateCategoryPromotion(
        updateCategoryPromotionInput,
      );
    return this.dataService.categoryPromotions.updateOneCategoryPromotionById(
      id,
      categoryPromotion,
    );
  }
  deleteOneCategoryPromotionById(id: string): Promise<ICategoryPromotion> {
    return this.dataService.categoryPromotions.deleteOneCategoryPromotionById(
      id,
    );
  }
}
