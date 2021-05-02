import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { __dev__ } from '.';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../models/*.entity.js'],
  synchronize: __dev__,
  ssl: __dev__ ? false : { rejectUnauthorized: false },
};

export { typeOrmConfig };
