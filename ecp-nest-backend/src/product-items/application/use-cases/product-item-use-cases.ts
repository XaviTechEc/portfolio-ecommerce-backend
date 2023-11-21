import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductItemsDataSourceService } from 'src/product-items/domain/abstracts/services/product-items-datasource.abstract.service';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { ProductItemFactoryService } from './factory/product-item-factory.service';

@Injectable()
export class ProductItemUseCases {
  constructor(
    private dataServices: IProductItemsDataSourceService,
    private productItemFactoryService: ProductItemFactoryService,
  ) {}

  getMany(props: GetManyProps<IProductItem>) {
    return this.dataServices.productItems.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.productItems.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductItemInput>) {
    const newProductItem = this.productItemFactoryService.createProductItem(
      props.data,
    );
    return this.dataServices.productItems.create({
      ...props,
      data: newProductItem,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductItemInput>) {
    const newProductItem = this.productItemFactoryService.updateProductItem(
      props.data,
    );
    return this.dataServices.productItems.updateOneById({
      ...props,
      data: newProductItem,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.productItems.deleteOneById({ ...props });
  }
}
