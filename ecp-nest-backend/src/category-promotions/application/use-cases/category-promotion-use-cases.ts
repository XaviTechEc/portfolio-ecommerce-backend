import { Injectable } from '@nestjs/common';
import { ICategoryPromotionRepository } from 'src/category-promotions/domain/abstracts/repositories/category-promotion.repository';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { ICategoryPromotion } from 'src/category-promotions/domain/entities/category-promotion.entity';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { CategoryPromotionFactoryService } from './factory/category-promotion-factory.service';

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
