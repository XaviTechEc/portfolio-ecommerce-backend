import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IPromotionsRepository } from 'src/core/abstracts/repositories';
import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class PromotionsRepository<T> implements IPromotionsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllPromotions(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getPromotionById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createPromotion(createPromotionInput: CreatePromotionInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removePromotion(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
