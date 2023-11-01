import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
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
    private dataService: IProductTagsDataSourceService,
    private productTagFactoryService: ProductTagFactoryService,
  ) {}
  getProductTagsBy(
    term: string,
    fields: (keyof IProductTag)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.productTags.getProductTagsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductTag(args?: IGenericArgs<IProductTag>) {
    return this.dataService.productTags.getAllProductTag(args);
  }
  getProductTagById(id: string): Promise<IProductTag> {
    return this.dataService.productTags.getProductTagById(id);
  }
  createProductTag(
    createProductTagInput: CreateProductTagInput,
  ): Promise<IProductTag> {
    const productTag = this.productTagFactoryService.createProductTag(
      createProductTagInput,
    );
    return this.dataService.productTags.createProductTag(productTag);
  }
  updateProductTag(
    id: string,
    updateProductTagInput: UpdateProductTagInput,
  ): Promise<IProductTag> {
    const productTag = this.productTagFactoryService.updateProductTag(
      updateProductTagInput,
    );
    return this.dataService.productTags.updateProductTag(id, productTag);
  }
  removeProductTag(id: string): Promise<IProductTag> {
    return this.dataService.productTags.removeProductTag(id);
  }
}
