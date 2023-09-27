import { ILocationsRepository } from 'src/addresses/domain/abstracts/repositories/locations.repository';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { Repository } from 'typeorm';
import { Location } from '../entities';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

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
    const location = this._repository.findOneBy({ id });
    if (!location) {
      return this._exceptionsService.notFound({
        message: `The location with id ${id} could not be found`,
      });
    }
    return location;
  }

  async createLocation(
    createLocationInput: CreateLocationInput,
  ): Promise<Location> {
    const newLocation = this._repository.create({ ...createLocationInput });
    return this._repository.save(newLocation);
  }
  async updateLocation(
    id: string,
    updateLocationInput: UpdateLocationInput,
  ): Promise<Location> {
    await this.getLocationById(id);
    const newLocation = await this._repository.preload({
      ...updateLocationInput,
    });
    if (!newLocation) {
      return this._exceptionsService.notFound({
        message: 'The location could not be preloaded',
      });
    }
    return this._repository.save(newLocation);
  }
  async removeLocation(id: string): Promise<Location> {
    const location = await this.getLocationById(id);
    return this._repository.remove(location);
  }
}
