import { IUserAddressRepository } from 'src/core/abstracts/repositories';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { UserAddress } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateUserAddressInput,
  UpdateUserAddressInput,
  PaginationArgs,
} from 'src/core/dtos';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class UserAddressesRepository
  implements IUserAddressRepository<UserAddress>
{
  private _repository: Repository<UserAddress>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<UserAddress>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getUserAddressesBy(
    term: string,
    fields: (keyof UserAddress)[],
    paginationArgs: PaginationArgs,
  ): Promise<UserAddress[]> {
    let queryOptions: FindManyOptions<UserAddress> = {};
    let relations: FindOptionsRelations<UserAddress> = {};
    let where: FindOptionsWhere<UserAddress> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
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

    const userAddressesBy = await this._repository.find(queryOptions);
    return userAddressesBy;
  }

  async getAllUserAddress(
    args?: IGenericArgs<UserAddress>,
  ): Promise<UserAddress[]> {
    let qb = this._repository.createQueryBuilder('userAddress');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const userAddresses = await qb.getMany();
    return userAddresses;
  }

  async getUserAddressById(id: string): Promise<UserAddress> {
    const userAddressFound = await this._repository.findOneBy({ id });
    if (!userAddressFound) {
      return this._exceptionsService.notFound({
        message: `The userAddress with id ${id} could not be found`,
      });
    }
    return this._repository.save(userAddressFound);
  }

  async createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<UserAddress> {
    const newUserAddress = this._repository.create({
      ...createUserAddressInput,
    });
    return newUserAddress;
  }

  async updateUserAddress(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<UserAddress> {
    await this.getUserAddressById(id);
    const newUserAddress = await this._repository.preload({
      ...updateUserAddressInput,
    });
    if (!newUserAddress) {
      return this._exceptionsService.notFound({
        message: 'The UserAddress could not be preloaded',
      });
    }
    return this._repository.save(newUserAddress);
  }

  async removeUserAddress(id: string): Promise<UserAddress> {
    const userAddress = await this.getUserAddressById(id);
    return this._repository.remove(userAddress);
  }
}