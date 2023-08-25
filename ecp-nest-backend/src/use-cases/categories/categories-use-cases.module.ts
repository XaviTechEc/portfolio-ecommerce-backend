import { Module } from '@nestjs/common';
import { CategoryUseCases } from './category-use-cases';
import { CategoryFactoryService } from './category-factory.service';
import { DataServicesModule } from 'src/services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  exports: [CategoryFactoryService, CategoryUseCases],
  providers: [CategoryFactoryService, CategoryUseCases],
})
export class CategoriesUseCasesModule {}
