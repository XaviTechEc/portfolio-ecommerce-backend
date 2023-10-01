import { ICountriesRepository } from 'src/addresses/domain/abstracts/repositories/countries.repository';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { Repository } from 'typeorm';
import { Country } from '../entities';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

const CONTEXT = 'CountriesRepository';

export class CountriesRepository implements ICountriesRepository<Country> {
  private _repository: Repository<Country>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Country>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllCountries(args?: IGenericArgs<Country>): Promise<Country[]> {
    try {
      let qb = this._repository.createQueryBuilder('country');

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
              .where(`country.code = UPPER(:code)`)
              .orWhere('country.long_name ILIKE LOWER(longName)')
              .setParameters({
                code: `${searchTerm}`,
                longName: `%${searchTerm}%`,
              });
          }
        }
      }

      const countries = (await qb.getMany()) ?? [];
      return countries;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getCountryById(id: string): Promise<Country> {
    try {
      const country = await this._repository.findOneBy({ id });
      if (!country) {
        return this._exceptionsService.notFound({
          message: `Country with id ${id} could not be found`,
        });
      }
      return country;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createCountry(
    createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    try {
      const newCountry = this._repository.create({ ...createCountryInput });
      return this._repository.save(newCountry);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    try {
      await this.getCountryById(id);
      const newCountry = await this._repository.preload({
        ...updateCountryInput,
      });
      return this._repository.save(newCountry);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeCountry(id: string): Promise<Country> {
    try {
      const list = await this.getCountryById(id);
      return this._repository.remove(list);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
