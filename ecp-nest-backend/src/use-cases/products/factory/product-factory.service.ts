import { Injectable } from '@nestjs/common';
import { CreateProductInput, UpdateProductInput } from 'src/core/dtos';
import { IProduct } from 'src/core/entities';

@Injectable()
export class ProductFactoryService {
  createProduct(createProductInput: CreateProductInput) {
    const newProduct = new IProduct();
    newProduct.title = createProductInput.title;
    newProduct.subtitle = createProductInput.subtitle;
    newProduct.description = createProductInput.description;
    newProduct.user = createProductInput.createdBy;
    return newProduct;
  }
  updateProduct(updateProductInput: UpdateProductInput) {
    const newProduct = new IProduct();
    newProduct.title = updateProductInput.title;
    newProduct.subtitle = updateProductInput.subtitle;
    newProduct.description = updateProductInput.description;
    newProduct.user = updateProductInput.createdBy;
    return newProduct;
  }
}
