import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IPromotionsRepository } from 'src/core/abstracts/repositories';
import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Promotion } from '../../entities/outputs/entities';

export class PromotionsRepository implements IPromotionsRepository<Promotion> {
  private _repository: Repository<Promotion>;

  constructor(repository: Repository<Promotion>) {
    this._repository = repository;
  }
  getAllPromotions(args?: IGenericArgs<Promotion>): Promise<Promotion[]> {
    throw new Error('Method not implemented.');
  }
  getPromotionById(id: string): Promise<Promotion> {
    throw new Error('Method not implemented.');
  }
  createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<Promotion> {
    throw new Error('Method not implemented.');
  }
  updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<Promotion> {
    throw new Error('Method not implemented.');
  }
  removePromotion(id: string): Promise<Promotion> {
    throw new Error('Method not implemented.');
  }
}
