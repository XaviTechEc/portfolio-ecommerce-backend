import { Injectable } from '@nestjs/common';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import {
  CreateProps,
  DeleteOneByIdProps,
  GetManyProps,
  GetOneByIdProps,
  UpdateOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { AddressFactoryService } from './factory';

@Injectable()
export class AddressesUseCases {
  constructor(
    private dataServices: IAddressDataSourceService,
    private addressFactoryService: AddressFactoryService,
  ) {}

  getMany(props: GetManyProps<IAddress>) {
    return this.dataServices.addresses.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.addresses.getOneById({ ...props });
  }

  create(props: CreateProps<CreateAddressInput>) {
    const newAddress = this.addressFactoryService.createAddress(props.data);
    return this.dataServices.addresses.create({ ...props, data: newAddress });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateAddressInput>) {
    const newAddress = this.addressFactoryService.updateAddress(props.data);
    return this.dataServices.addresses.updateOneById({
      ...props,
      data: newAddress,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.addresses.deleteOneById({ ...props });
  }

  restoreOneById(props: DeleteOneByIdProps) {
    return this.dataServices.addresses.restoreOneById({ ...props });
  }
}
