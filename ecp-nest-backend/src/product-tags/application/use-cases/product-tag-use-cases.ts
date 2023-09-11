import { Injectable } from '@nestjs/common';
import { IProductTagRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { IProductTag } from 'src/core/entities';
import { ProductTagFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductTagInput,
  UpdateProductTagInput,
  PaginationArgs,
} from 'src/core/dtos';

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
