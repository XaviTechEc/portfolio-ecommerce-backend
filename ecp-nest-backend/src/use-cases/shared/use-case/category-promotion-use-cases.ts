import { Injectable } from '@nestjs/common';
import { ICategoryPromotionRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { ICategoryPromotion } from 'src/core/entities';
import { CategoryPromotionFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
  PaginationArgs,
} from 'src/core/dtos';

@Injectable()
export class CategoryPromotionUseCases
  implements ICategoryPromotionRepository<ICategoryPromotion>
{
  constructor(
    private dataService: IDataSourcesService,
    private categoryPromotionFactoryService: CategoryPromotionFactoryService,
  ) {}
  getCategoryPromotionBy(
    term: string,
    fields: (keyof ICategoryPromotion)[],
    paginationArgs: PaginationArgs,
  ): Promise<ICategoryPromotion[]> {
    return this.dataService.categoryPromotions.getCategoryPromotionBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllCategoryPromotion(
    args?: IGenericArgs<ICategoryPromotion>,
  ): Promise<ICategoryPromotion[]> {
    return this.dataService.categoryPromotions.getAllCategoryPromotion(args);
  }
  getCategoryPromotionById(id: string): Promise<ICategoryPromotion> {
    return this.dataService.categoryPromotions.getCategoryPromotionById(id);
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
  updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<ICategoryPromotion> {
    const categoryPromotion =
      this.categoryPromotionFactoryService.updateCategoryPromotion(
        updateCategoryPromotionInput,
      );
    return this.dataService.categoryPromotions.updateCategoryPromotion(
      id,
      categoryPromotion,
    );
  }
  removeCategoryPromotion(id: string): Promise<ICategoryPromotion> {
    return this.dataService.categoryPromotions.removeCategoryPromotion(id);
  }
}
