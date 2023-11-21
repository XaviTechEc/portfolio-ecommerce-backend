import { Injectable } from '@nestjs/common';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import {
  CreateLocationInput,
  UpdateLocationInput,
} from 'src/addresses/domain/dtos/graphql/inputs/location.input';
import { ILocation } from 'src/addresses/domain/entities/location.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { LocationFactoryService } from './factory';

@Injectable()
export class LocationsUseCases {
  constructor(
    private dataServices: IAddressDataSourceService,
    private locationFactoryService: LocationFactoryService,
  ) {}

  getMany(props: GetManyProps<ILocation>) {
    return this.dataServices.locations.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.locations.getOneById({ ...props });
  }

  create(props: CreateProps<CreateLocationInput>) {
    const newLocation = this.locationFactoryService.createLocation(props.data);
    return this.dataServices.locations.create({ ...props, data: newLocation });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateLocationInput>) {
    const newLocation = this.locationFactoryService.updateLocation(props.data);
    return this.dataServices.locations.updateOneById({
      ...props,
      data: newLocation,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.locations.deleteOneById({ ...props });
  }

  restoreOneById(props: DeleteOneByIdProps) {
    return this.dataServices.locations.restoreOneById({ ...props });
  }
}
