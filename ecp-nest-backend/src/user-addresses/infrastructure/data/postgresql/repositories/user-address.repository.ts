import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IUserAddressRepository } from 'src/user-addresses/domain/abstracts/repositories/user-address.repository';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { UserAddress } from '../entities/UserAddress.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'UserAddressesRepository';

export class UserAddressesRepository
  implements IUserAddressRepository<UserAddress>
{
  private _repository: Repository<UserAddress>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<UserAddress>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getUserAddressesBy(
    term: string,
    fields: (keyof UserAddress)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<UserAddress>> {
    try {
      let queryOptions: FindManyOptions<UserAddress> = {};
      let relations: FindOptionsRelations<UserAddress> = {};
      let where: FindOptionsWhere<UserAddress> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'user') {
          relations = { ...relations, user: true };
          where = {
            ...where,
            user: [
              { username: ILike(`%${term}%`) },
              { email: ILike(`%${term}%`) },
              { fullName: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'address') {
          relations = { ...relations, address: true };
          where = {
            ...where,
            address: [
              { addressLine1: ILike(`%${term}%`) },
              { addressLine2: ILike(`%${term}%`) },
              { reference: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllUserAddress(
    args?: IGenericArgs<UserAddress>,
  ): Promise<GetAllGenericResponse<UserAddress>> {
    try {
      let qb = this._repository.createQueryBuilder('userAddress');
      let pageSize;

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getUserAddressById(id: string): Promise<UserAddress> {
    try {
      const userAddressFound = await this._repository.findOneBy({ id });
      if (!userAddressFound) {
        return this._exceptionsService.notFound({
          message: `The userAddress with id ${id} could not be found`,
        });
      }
      return userAddressFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<UserAddress> {
    try {
      const newUserAddress = this._repository.create({
        ...createUserAddressInput,
      });
      return this._repository.save(newUserAddress);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateUserAddress(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<UserAddress> {
    try {
      await this.getUserAddressById(id);
      const newUserAddress = await this._repository.preload({
        ...updateUserAddressInput,
      });
      return this._repository.save(newUserAddress);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeUserAddress(id: string): Promise<UserAddress> {
    try {
      const userAddress = await this.getUserAddressById(id);
      return this._repository.remove(userAddress);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
