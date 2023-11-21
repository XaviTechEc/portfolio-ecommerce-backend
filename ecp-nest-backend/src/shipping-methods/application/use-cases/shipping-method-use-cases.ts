import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IShippingMethodsDataSourceService } from 'src/shipping-methods/domain/abstracts/services/shipping-methods-datasource.abstract.service';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { ShippingMethodFactoryService } from './factory/shipping-method-factory.service';

@Injectable()
export class ShippingMethodUseCases {
  constructor(
    private dataServices: IShippingMethodsDataSourceService,
    private shippingMethodFactoryService: ShippingMethodFactoryService,
  ) {}

  getMany(props: GetManyProps<IShippingMethod>) {
    return this.dataServices.shippingMethods.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.shippingMethods.getOneById({ ...props });
  }

  create(props: CreateProps<CreateShippingMethodInput>) {
    const newShippingMethod =
      this.shippingMethodFactoryService.createShippingMethod(props.data);
    return this.dataServices.shippingMethods.create({
      ...props,
      data: newShippingMethod,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateShippingMethodInput>) {
    const newShippingMethod =
      this.shippingMethodFactoryService.updateShippingMethod(props.data);
    return this.dataServices.shippingMethods.updateOneById({
      ...props,
      data: newShippingMethod,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.shippingMethods.deleteOneById({ ...props });
  }
}
