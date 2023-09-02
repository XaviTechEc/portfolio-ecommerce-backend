import { IProductPromotionRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductPromotion } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/core/dtos';

export class ProductPromotionsRepository
  implements IProductPromotionRepository<ProductPromotion>
{
  private _repository: Repository<ProductPromotion>;

  constructor(repository: Repository<ProductPromotion>) {
    this._repository = repository;
  }
  getAllProductPromotion(
    args?: IGenericArgs<ProductPromotion>,
  ): Promise<ProductPromotion[]> {
    throw new Error('Method not implemented.');
  }
  getProductPromotionById(id: string): Promise<ProductPromotion> {
    throw new Error('Method not implemented.');
  }
  createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<ProductPromotion> {
    throw new Error('Method not implemented.');
  }
  updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<ProductPromotion> {
    throw new Error('Method not implemented.');
  }
  removeProductPromotion(id: string): Promise<ProductPromotion> {
    throw new Error('Method not implemented.');
  }
}
