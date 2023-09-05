import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { UserPaymentMethod } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class UserPaymentMethodsRepository
  implements IUserPaymentMethodsRepository<UserPaymentMethod>
{
  private _repository: Repository<UserPaymentMethod>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<UserPaymentMethod>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllUserPaymentMethods(
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod[]> {
    let qb = this._repository.createQueryBuilder('userPaymentMethod');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const userPaymentMethods = await qb.getMany();
    return userPaymentMethods;
  }
  async getAllUserPaymentMethodsBy(
    fields: Partial<UserPaymentMethod>,
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod[]> {
    throw new Error('Method not implemented.');
  }
  async getUserPaymentMethodBy(
    fields: Partial<UserPaymentMethod>,
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  async getUserPaymentMethodById(id: string): Promise<UserPaymentMethod> {
    const userPaymentMethodFound = await this._repository.findOneBy({ id });
    if (!userPaymentMethodFound) {
      return this._exceptionsService.notFound({
        message: `The userPaymentMethod with id ${id} could not be found`,
      });
    }
    return this._repository.save(userPaymentMethodFound);
  }
  async createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    const newUserPaymentMethod = this._repository.create({
      ...createUserPaymentMethodInput,
    });
    return newUserPaymentMethod;
  }
  async updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    await this.getUserPaymentMethodById(id);
    const newUserPaymentMethod = await this._repository.preload({
      ...updateUserPaymentMethodInput,
    });
    if (!newUserPaymentMethod) {
      return this._exceptionsService.notFound({
        message: 'The UserPaymentMethod could not be preloaded',
      });
    }
    return this._repository.save(newUserPaymentMethod);
  }
  async removeUserPaymentMethod(id: string): Promise<UserPaymentMethod> {
    const userPaymentMethod = await this.getUserPaymentMethodById(id);
    return this._repository.remove(userPaymentMethod);
  }
}
