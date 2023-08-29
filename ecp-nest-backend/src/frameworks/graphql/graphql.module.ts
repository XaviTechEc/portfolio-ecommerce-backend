import { Module } from '@nestjs/common';
import { RegisterEnumsService } from './config/register-enums.service';

@Module({
  imports: [],
  exports: [],
  providers: [RegisterEnumsService],
})
export class MyGraphqlModule {}
