import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { FindManyOptions, Repository } from 'typeorm';
import { ShippingMethod } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ShippingMethodsRepository
  implements IShippingMethodsRepository<ShippingMethod>
{
  private _repository: Repository<ShippingMethod>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShippingMethod>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllShippingMethods(
    args?: IGenericArgs<ShippingMethod>,
  ): Promise<ShippingMethod[]> {
    let queryOptions: FindManyOptions<ShippingMethod> = {};

    if (args?.paginationArgs) {
      const { limit = 10, offset = 0 } = args.paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    const shippingMethods = await this._repository.find(queryOptions);
    return shippingMethods;
  }

  async getShippingMethodById(id: string): Promise<ShippingMethod> {
    const shippingMethodFound = await this._repository.findOneBy({ id });
    if (!shippingMethodFound) {
      return this._exceptionsService.notFound({
        message: `The shipping method with id ${id} could not be found`,
      });
    }
    return shippingMethodFound;
  }

  async createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<ShippingMethod> {
    const newShippingMethod = await this._repository.create({
      ...createShippingMethodInput,
    });
    return this._repository.save(newShippingMethod);
  }

  async updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<ShippingMethod> {
    await this.getShippingMethodById(id);
    const newShippingMethod = await this._repository.preload({
      ...updateShippingMethodInput,
    });
    if (!newShippingMethod) {
      return this._exceptionsService.notFound({
        message: 'The shipping method could not be preloaded',
      });
    }
    return this._repository.save(newShippingMethod);
  }

  async removeShippingMethod(id: string): Promise<ShippingMethod> {
    const shippingMethod = await this.getShippingMethodById(id);
    return this._repository.remove(shippingMethod);
  }
}
