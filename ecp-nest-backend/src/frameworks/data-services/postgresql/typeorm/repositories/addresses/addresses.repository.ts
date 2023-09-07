import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IAddressesRepository } from 'src/core/abstracts/repositories';
import {
  CreateAddressInput,
  PaginationArgs,
  UpdateAddressInput,
} from 'src/core/dtos';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { Address } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class AddressesRepository implements IAddressesRepository<Address> {
  private _repository: Repository<Address>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Address>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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
    return addressesBy;
  }

  async getAllAddresses(args?: IGenericArgs<Address>): Promise<Address[]> {
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

    const addressesFound = await qb.getMany();
    return addressesFound;
  }

  async getAddressById(id: string): Promise<Address> {
    const address = await this._repository.findOneBy({ id });
    if (!address) {
      return this._exceptionsService.notFound({
        message: `The address with id ${id} could not be found`,
        code_error: 404,
      });
    }
    return address;
  }
  async createAddress(
    createAddressInput: CreateAddressInput,
  ): Promise<Address> {
    const newAddress = this._repository.create({ ...createAddressInput });
    return this._repository.save(newAddress);
  }
  async updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    await this.getAddressById(id);
    const address = await this._repository.preload({ ...updateAddressInput });
    if (!address) {
      return this._exceptionsService.notFound({
        message: `The address could not be preloaded`,
      });
    }
    return this._repository.save(address);
  }

  async removeAddress(id: string): Promise<Address> {
    const item = await this.getAddressById(id);
    return this._repository.remove(item);
  }
}
