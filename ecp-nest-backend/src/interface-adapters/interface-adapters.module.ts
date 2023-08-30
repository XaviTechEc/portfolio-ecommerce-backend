import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/use-cases/use-cases.module';
import { ReviewsResolver } from './resolvers/reviews/reviews.resolver';

@Module({
  imports: [UseCasesModule],
  controllers: [],
  providers: [ReviewsResolver],
})
export class InterfaceAdaptersModule {}
