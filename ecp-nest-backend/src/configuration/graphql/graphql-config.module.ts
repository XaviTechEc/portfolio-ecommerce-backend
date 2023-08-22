import { Module } from '@nestjs/common';
import { GqlConfigService } from './graphql-config.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
  ],
  exports: [GqlConfigService, GraphQLModule],
  providers: [GqlConfigService],
})
export class GraphqlConfigModule {}
