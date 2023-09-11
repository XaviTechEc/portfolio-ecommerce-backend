import { ILocationsRepository } from 'src/core/abstracts/repositories';
import { CreateLocationInput, UpdateLocationInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Location } from '../../entities/outputs/entities';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class LocationsRepository implements ILocationsRepository<Location> {
  private _repository: Repository<Location>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Location>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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
