import { Module } from '@nestjs/common';
import { UserController } from './controllers/users/user.controller';
import { UseCasesModule } from 'src/use-cases/use-cases.module';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [UseCasesModule],
  controllers: [UserController],
  providers: [UserResolver],
})
export class InterfaceAdaptersModule {}
