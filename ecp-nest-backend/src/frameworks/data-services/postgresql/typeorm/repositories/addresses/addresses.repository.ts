import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IAddressesRepository } from 'src/core/abstracts/repositories';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Address } from '../../entities/outputs/entities';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AddressesRepository implements IAddressesRepository<Address> {
  private _repository: Repository<Address>;
  constructor(repository: Repository<Address>) {
    this._repository = repository;
  }
  async getAddressesBy(args?: IGenericArgs<Address>): Promise<Address[]> {
    let qb = this._repository.createQueryBuilder();
    qb = qb.where({});

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
            throw new BadRequestException('Search fields are required');
          }

          searchFields.forEach((sf) => {
            if (!sf) return;
            qb = qb.orWhere(`LOWER(${sf}) LIKE LOWER(:searchTerm)`, {
              searchTerm: `%${searchTerm}%`,
            });
          });
        }
      }
    }

    const addressesFound = await qb.getMany();
    return addressesFound;
  }
  async getOneAddressBy(
    fields: Partial<Address>,
    args?: IGenericArgs<Address>,
  ): Promise<Address> {
    let qb = this._repository.createQueryBuilder('address');
    qb = qb.where({ ...fields });

    if (args) {
      const { searchArgs } = args;
      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;
        if (searchTerm) {
          if (!searchFields || searchFields.length === 0) {
            throw new BadRequestException('Search fields are required');
          }
          searchFields.forEach((sf) => {
            if (!sf) return;
            qb = qb.orWhere(`LOWER(${sf}) LIKE LOWER(:searchTerm)`, {
              searchTerm: `%${searchTerm}%`,
            });
          });
        }
      }
    }
    const addressFound = await qb.getOne();
    if (!addressFound) {
      throw new NotFoundException();
    }
    return addressFound;
  }
  async getAddressById(id: string): Promise<Address> {
    return this._repository.findOneBy({ id });
  }
  async createAddress(
    createAddressInput: CreateAddressInput,
  ): Promise<Address> {
    return this._repository.save({ ...createAddressInput });
  }
  async updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    await this.getAddressById(id);
    const address = await this._repository.preload({ ...updateAddressInput });
    if (!address) {
      throw new NotFoundException();
    }
    return this._repository.save(address);
  }

  async removeAddress(id: string): Promise<Address> {
    const item = await this.getAddressById(id);
    return this._repository.remove(item);
  }
}
