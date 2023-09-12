import { Injectable } from '@nestjs/common';
import { ICategoryPromotionsDataSourceService } from 'src/category-promotions/domain/abstracts/services/category-promotions-datasource.abstract.service';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { ICategoryPromotion } from 'src/category-promotions/domain/entities/category-promotion.entity';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { CategoryPromotionFactoryService } from './factory/category-promotion-factory.service';

@Injectable()
export class CategoryPromotionUseCases {
  constructor(
    private dataService: ICategoryPromotionsDataSourceService,
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
