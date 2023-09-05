import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IAddressesRepository } from 'src/core/abstracts/repositories';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
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

  async getAllAddresses(args?: IGenericArgs<Address>): Promise<Address[]> {
    let qb = this._repository.createQueryBuilder('address');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.limit(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;
        if (searchTerm) {
          if (!searchFields || searchFields.length === 0) {
            return this._exceptionsService.badRequest({
              message: 'Search fields are required',
              code_error: 404,
            });
          }

          // Joins
          qb = qb
            .leftJoin('address.country_id', 'country')
            .leftJoin('address.location_id', 'location')
            .where({});

          searchFields.forEach((sf) => {
            if (!sf) return;
            if (sf === 'country.code') {
              qb = qb.andWhere('UPPER(country.code) = UPPER(:code)', {
                code: searchTerm,
              });
            }

            if (sf === 'country.long_name') {
              qb = qb.andWhere(
                'LOWER(country.long_name) LIKE LOWER(:longName)',
                {
                  longName: `%${searchTerm}%`,
                },
              );
            }

            qb = qb.andWhere(`LOWER(${sf}) LIKE LOWER(:searchTerm)`, {
              searchTerm: `%${searchTerm}%`,
            });
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
