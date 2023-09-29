import { IAddressesRepository } from 'src/addresses/domain/abstracts/repositories/addresses.repository';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { Address } from '../entities';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

const CONTEXT = 'AddressesRepository';

export class AddressesRepository implements IAddressesRepository<Address> {
  private _repository: Repository<Address>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Address>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAddressesBy(
    term: string,
    fields: (keyof Address)[],
    paginationArgs?: PaginationArgs,
  ): Promise<Address[]> {
    try {
      let queryOptions: FindManyOptions<Address> = {};
      let relations: FindOptionsRelations<Address> = {};
      let where: FindOptionsWhere<Address> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'country') {
          relations = { ...relations, country: true };
          where = {
            ...where,
            country: [
              { code: term },
              { longName: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'location') {
          relations = { ...relations, location: true };
          where = { ...where, location: { id: term } };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const addressesBy = await this._repository.find(queryOptions);

      if (!addressesBy) {
        return this._exceptionsService.notFound({
          message: `The addresses with ${term} could not be found`,
        });
      }

      return addressesBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllAddresses(args?: IGenericArgs<Address>): Promise<Address[]> {
    try {
      let qb = this._repository.createQueryBuilder('address');

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.limit(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;
          if (searchTerm) {
            qb = qb
              .where('address.reference ILIKE LOWER(:reference)')
              .orWhere('address.address_line1 ILIKE LOWER(:ad1)')
              .orWhere('address.address_line2 ILIKE LOWER(:ad2)')
              .setParameters({
                reference: `%${searchTerm}%`,
                address_line1: `%${searchTerm}%`,
                address_line2: `%${searchTerm}%`,
              });
          }
        }
      }

      const addressesFound = (await qb.getMany()) ?? [];

      return addressesFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAddressById(id: string): Promise<Address> {
    try {
      const address = await this._repository.findOneBy({ id });
      if (!address) {
        return this._exceptionsService.notFound({
          message: `The address with id ${id} could not be found`,
        });
      }
      return address;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createAddress(
    createAddressInput: CreateAddressInput,
  ): Promise<Address> {
    try {
      const newAddress = this._repository.create({ ...createAddressInput });
      return this._repository.save(newAddress);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    try {
      await this.getAddressById(id);
      const address = await this._repository.preload({ ...updateAddressInput });
      return this._repository.save(address);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeAddress(id: string): Promise<Address> {
    try {
      const item = await this.getAddressById(id);
      return this._repository.remove(item);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
