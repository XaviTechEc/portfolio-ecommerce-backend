import { ILocationsRepository } from 'src/addresses/domain/abstracts/repositories/locations.repository';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { Repository } from 'typeorm';
import { Location } from '../entities';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

const CONTEXT = 'LocationsRepository';

export class LocationsRepository implements ILocationsRepository<Location> {
  private _repository: Repository<Location>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Location>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getLocationById(id: string): Promise<Location> {
    try {
      const location = this._repository.findOneBy({ id });
      if (!location) {
        return this._exceptionsService.notFound({
          message: `The location with id ${id} could not be found`,
        });
      }
      return location;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createLocation(
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    try {
      const newLocation = this._repository.create({ ...createLocationInput });
      return this._repository.save(newLocation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
  async updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    try {
      await this.getLocationById(id);
      const newLocation = await this._repository.preload({
        ...updateLocationInput,
      });
      return this._repository.save(newLocation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
  async removeLocation(id: string): Promise<Location> {
    try {
      const location = await this.getLocationById(id);
      return this._repository.remove(location);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
