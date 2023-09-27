import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IPaymentMethodsRepository } from 'src/payment-methods/domain/abstracts/repositories/payment-methods.repository';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { Repository, FindManyOptions } from 'typeorm';
import { PaymentMethod } from '../entities/PaymentMethod.entity';

export class PaymentMethodsRepository
  implements IPaymentMethodsRepository<PaymentMethod>
{
  private _repository: Repository<PaymentMethod>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<PaymentMethod>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllPaymentMethods(
    args?: IGenericArgs<PaymentMethod>,
  ): Promise<PaymentMethod[]> {
    let queryOptions: FindManyOptions<PaymentMethod> = {};
    if (args) {
      const { paginationArgs } = args;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }
    }
    const paymentMethods = await this._repository.find(queryOptions);
    return paymentMethods;
  }

  async getPaymentMethodById(id: string): Promise<PaymentMethod> {
    const paymentMethodFound = await this._repository.findOneBy({ id });
    return this._repository.save(paymentMethodFound);
  }

  async createPaymentMethod(
    data: CreatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    const newPaymentMethod = this._repository.create({ ...data });
    return newPaymentMethod;
  }

  async updatePaymentMethod(
    id: string,
    data: UpdatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    await this.getPaymentMethodById(id);
    const newPaymentMethod = await this._repository.preload({
      ...data,
    });
    if (!newPaymentMethod) {
      return this._exceptionsService.notFound({
        message: 'The PaymentMethod could not be preloaded',
      });
    }
    return this._repository.save(newPaymentMethod);
  }

  async removePaymentMethod(id: string): Promise<PaymentMethod> {
    const paymentMethod = await this.getPaymentMethodById(id);
    return this._repository.remove(paymentMethod);
  }
}
