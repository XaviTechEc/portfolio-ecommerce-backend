import { Module } from '@nestjs/common';
import { UserController } from './controllers/users/user.controller';
import { UseCasesModule } from 'src/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
  providers: [],
})
export class InterfaceAdaptersModule {}
