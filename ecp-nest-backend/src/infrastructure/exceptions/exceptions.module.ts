import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';

@Module({
  imports: [],
  exports: [ExceptionsService],
  providers: [ExceptionsService],
})
export class ExceptionModule {}
