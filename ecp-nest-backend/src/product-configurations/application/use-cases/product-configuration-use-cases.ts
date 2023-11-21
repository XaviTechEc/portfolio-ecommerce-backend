import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductConfigurationsDataSourceService } from 'src/product-configurations/domain/abstracts/services/product-configurations-datasource.abstract.service';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import { IProductConfiguration } from 'src/product-configurations/domain/entities/product-configuration.entity';
import { ProductConfigurationFactoryService } from './factory/product-configuration-factory.service';

@Injectable()
export class ProductConfigurationUseCases {
  constructor(
    private dataServices: IProductConfigurationsDataSourceService,
    private productConfigurationFactoryService: ProductConfigurationFactoryService,
  ) {}

  getMany(props: GetManyProps<IProductConfiguration>) {
    return this.dataServices.productConfigurations.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.productConfigurations.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductConfigurationInput>) {
    const newProductConfiguration =
      this.productConfigurationFactoryService.createProductConfiguration(
        props.data,
      );
    return this.dataServices.productConfigurations.create({
      ...props,
      data: newProductConfiguration,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductConfigurationInput>) {
    const newProductConfiguration =
      this.productConfigurationFactoryService.updateProductConfiguration(
        props.data,
      );
    return this.dataServices.productConfigurations.updateOneById({
      ...props,
      data: newProductConfiguration,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.productConfigurations.deleteOneById({ ...props });
  }
}
