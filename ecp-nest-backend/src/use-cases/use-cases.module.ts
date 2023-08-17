import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './users/user-use-cases.module';

@Module({
  imports: [UserUseCasesModule],
  exports: [UserUseCasesModule],
})
export class UseCasesModule {}
