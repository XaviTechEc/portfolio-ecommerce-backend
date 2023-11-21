import { Injectable } from '@nestjs/common';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from 'src/addresses/domain/dtos/graphql/inputs/country.input';
import { ICountry } from 'src/addresses/domain/entities/country.entity';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { CountryFactoryService } from './factory';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';

@Injectable()
export class CountriesUseCases {
  constructor(
    private dataServices: IAddressDataSourceService,
    private countryFactoryService: CountryFactoryService,
  ) {}

  getMany(props: GetManyProps<ICountry>) {
    return this.dataServices.countries.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.countries.getOneById({ ...props });
  }

  create(props: CreateProps<CreateCountryInput>) {
    const newCountry = this.countryFactoryService.createCountry(props.data);
    return this.dataServices.countries.create({ ...props, data: newCountry });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateCountryInput>) {
    const newCountry = this.countryFactoryService.updateCountry(props.data);
    return this.dataServices.countries.updateOneById({
      ...props,
      data: newCountry,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.countries.deleteOneById({ ...props });
  }

  restoreOneById(props: DeleteOneByIdProps) {
    return this.dataServices.countries.restoreOneById({ ...props });
  }
}
