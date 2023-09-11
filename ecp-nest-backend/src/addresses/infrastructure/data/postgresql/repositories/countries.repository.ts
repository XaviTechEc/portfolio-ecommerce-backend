import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ICountriesRepository } from 'src/core/abstracts/repositories';
import { CreateCountryInput, UpdateCountryInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Country } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class CountriesRepository implements ICountriesRepository<Country> {
  private _repository: Repository<Country>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Country>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllCountries(args?: IGenericArgs<Country>): Promise<Country[]> {
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

    const countries = qb.getMany();
    return countries;
  }

  async getCountryById(id: string): Promise<Country> {
    const country = await this._repository.findOneBy({ id });
    if (!country) {
      return this._exceptionsService.notFound({
        message: `Country with id ${id} could not be found`,
        code_error: 404,
      });
    }
    return country;
  }

  async createCountry(
    createCountryInput: CreateCountryInput,
  ): Promise<Country> {
    const newCountry = this._repository.create({ ...createCountryInput });
    return this._repository.save(newCountry);
  }

  async updateCountry(
    id: string,
    updateCountryInput: UpdateCountryInput,
  ): Promise<Country> {
    await this.getCountryById(id);
    const newCountry = await this._repository.preload({
      ...updateCountryInput,
    });
    if (!newCountry) {
      return this._exceptionsService.notFound({
        message: 'The country could not be preloaded',
      });
    }
    return this._repository.save(newCountry);
  }

  async removeCountry(id: string): Promise<Country> {
    const list = await this.getCountryById(id);
    return this._repository.remove(list);
  }
}