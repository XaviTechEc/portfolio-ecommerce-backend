import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IProductTagsDataSourceService } from 'src/product-tags/domain/abstracts/services/product-tags-datasource.abstract.service';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import { IProductTag } from 'src/product-tags/domain/entities/product-tag.entity';
import { ProductTagFactoryService } from './factory/product-tag-factory.service';

@Injectable()
export class ProductTagUseCases {
  constructor(
    private dataServices: IProductTagsDataSourceService,
    private productTagFactoryService: ProductTagFactoryService,
  ) {}

  getMany(props: GetManyProps<IProductTag>) {
    return this.dataServices.productTags.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.productTags.getOneById({ ...props });
  }

  create(props: CreateProps<CreateProductTagInput>) {
    const newProductTag = this.productTagFactoryService.createProductTag(
      props.data,
    );
    return this.dataServices.productTags.create({
      ...props,
      data: newProductTag,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateProductTagInput>) {
    const newProductTag = this.productTagFactoryService.updateProductTag(
      props.data,
    );
    return this.dataServices.productTags.updateOneById({
      ...props,
      data: newProductTag,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.productTags.deleteOneById({ ...props });
  }
}
