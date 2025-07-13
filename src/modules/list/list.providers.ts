import { DataSource } from 'typeorm';
import { List } from './entities/list.entity';

export const listProviders = [
  {
    provide: 'LIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(List),
    inject: ['DATA_SOURCE'],
  },
];
