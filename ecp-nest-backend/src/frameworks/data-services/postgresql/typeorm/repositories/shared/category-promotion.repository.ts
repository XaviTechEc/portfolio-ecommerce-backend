import { ICategoryPromotionRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { CategoryPromotion } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';

export class CategoryPromotionsRepository
  implements ICategoryPromotionRepository<CategoryPromotion>
{
  private _repository: Repository<CategoryPromotion>;

  constructor(repository: Repository<CategoryPromotion>) {
    this._repository = repository;
  }
  getAllCategoryPromotion(
    args?: IGenericArgs<CategoryPromotion>,
  ): Promise<CategoryPromotion[]> {
    throw new Error('Method not implemented.');
  }
  getCategoryPromotionById(id: string): Promise<CategoryPromotion> {
    throw new Error('Method not implemented.');
  }
  createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    throw new Error('Method not implemented.');
  }
  updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    throw new Error('Method not implemented.');
  }
  removeCategoryPromotion(id: string): Promise<CategoryPromotion> {
    throw new Error('Method not implemented.');
  }
}
