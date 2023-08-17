import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseOrmOptionsType = TypeOrmModuleOptions;
export interface IDataConfiguration {
  postgres: DatabaseOrmOptionsType;
}

export const DatabaseConfiguration: IDataConfiguration = {
  postgres: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  },
};
