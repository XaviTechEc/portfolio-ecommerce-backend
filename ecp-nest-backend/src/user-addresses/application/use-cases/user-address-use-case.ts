import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IUserAddressesDataSourceService } from 'src/user-addresses/domain/abstracts/services/user-addresses-datasource.abstract.service';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';
import { UserAddressFactoryService } from './factory/user-address-factory.service';

@Injectable()
export class UserAddressUseCases {
  constructor(
    private dataServices: IUserAddressesDataSourceService,
    private userAddressFactoryService: UserAddressFactoryService,
  ) {}

  getMany(props: GetManyProps<IUserAddress>) {
    return this.dataServices.userAddresses.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.userAddresses.getOneById({ ...props });
  }

  create(props: CreateProps<CreateUserAddressInput>) {
    const newUserAddress = this.userAddressFactoryService.createUserAddress(
      props.data,
    );
    return this.dataServices.userAddresses.create({
      ...props,
      data: newUserAddress,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateUserAddressInput>) {
    const newUserAddress = this.userAddressFactoryService.updateUserAddress(
      props.data,
    );
    return this.dataServices.userAddresses.updateOneById({
      ...props,
      data: newUserAddress,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.userAddresses.deleteOneById({ ...props });
  }
}
