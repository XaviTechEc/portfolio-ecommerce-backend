import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductsDataSourceService } from 'src/products/domain/abstracts/services/products-datasource.abstract.service';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { ProductFactoryService } from './factory/product-factory.service';

@Injectable()
export class ProductUseCases {
  constructor(
    private dataServices: IProductsDataSourceService,
    private productFactoryService: ProductFactoryService,
  ) {}

  getMany(props: GetManyProps<IProduct>) {
    return this.dataServices.products.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.products.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductInput>) {
    const newProduct = this.productFactoryService.createProduct(props.data);
    return this.dataServices.products.create({ ...props, data: newProduct });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductInput>) {
    const newProduct = this.productFactoryService.updateProduct(props.data);
    return this.dataServices.products.updateOneById({
      ...props,
      data: newProduct,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.products.deleteOneById({ ...props });
  }
}
