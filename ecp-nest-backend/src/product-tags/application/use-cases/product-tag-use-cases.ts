import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductTagRepository } from 'src/product-tags/domain/abstracts/repositories/product-tag.repository';
import {
  CreateProductTagInput,
  UpdateProductTagInput,
} from 'src/product-tags/domain/dtos/graphql/inputs/product-tag.input';
import { IProductTag } from 'src/product-tags/domain/entities/product-tag.entity';
import { ProductTagFactoryService } from './factory/product-tag-factory.service';

@Injectable()
export class ProductTagUseCases implements IProductTagRepository<IProductTag> {
  constructor(
    private dataService: IDataSourcesService,
    private productTagFactoryService: ProductTagFactoryService,
  ) {}
  getProductTagsBy(
    term: string,
    fields: (keyof IProductTag)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProductTag[]> {
    return this.dataService.productTags.getProductTagsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductTag(args?: IGenericArgs<IProductTag>): Promise<IProductTag[]> {
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
