import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IUserPaymentMethodsDataSourceService } from 'src/user-payment-methods/domain/abstracts/services/user-payment-methods-datasource.abstract.service';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { UserPaymentMethodFactoryService } from './factory/user-payment-method-factory.service';

@Injectable()
export class UserPaymentMethodUseCases {
  constructor(
    private dataServices: IUserPaymentMethodsDataSourceService,
    private userPaymentMethodFactoryService: UserPaymentMethodFactoryService,
  ) {}

  getMany(props: GetManyProps<IUserPaymentMethod>) {
    return this.dataServices.userPaymentMethods.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.userPaymentMethods.getOneById({ ...props });
  }

  create(props: CreateProps<CreateUserPaymentMethodInput>) {
    const newUserPaymentMethod =
      this.userPaymentMethodFactoryService.createUserPaymentMethod(props.data);
    return this.dataServices.userPaymentMethods.create({
      ...props,
      data: newUserPaymentMethod,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateUserPaymentMethodInput>) {
    const newUserPaymentMethod =
      this.userPaymentMethodFactoryService.updateUserPaymentMethod(props.data);
    return this.dataServices.userPaymentMethods.updateOneById({
      ...props,
      data: newUserPaymentMethod,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.userPaymentMethods.deleteOneById({ ...props });
  }
}
