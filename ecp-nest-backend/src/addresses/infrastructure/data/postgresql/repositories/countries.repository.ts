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
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

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

  async getAllCountries(
    args?: IGenericArgs<Country>,
  ): Promise<GetAllGenericResponse<Country>> {
    try {
      let qb = this._repository.createQueryBuilder('country');
      let pageSize;

      if (args) {
        const { paginationArgs, searchArgs } = args;

        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
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

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
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
