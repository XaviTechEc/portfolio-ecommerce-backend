import { Injectable } from '@nestjs/common';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/products/domain/dtos/graphql/inputs/product.input';
import { IProduct } from 'src/products/domain/entities/product.entity';

@Injectable()
export class ProductFactoryService {
  createProduct(createProductInput: CreateProductInput) {
    const newProduct = new IProduct();
    newProduct.title = createProductInput.title;
    newProduct.subtitle = createProductInput.subtitle;
    newProduct.description = createProductInput.description;
    newProduct.active = createProductInput.active;
    return newProduct;
  }
  updateProduct(updateProductInput: UpdateProductInput) {
    const newProduct = new IProduct();
    newProduct.id = updateProductInput.id;
    newProduct.title = updateProductInput.title;
    newProduct.subtitle = updateProductInput.subtitle;
    newProduct.description = updateProductInput.description;
    newProduct.active = updateProductInput.active;
    return newProduct;
  }
}
