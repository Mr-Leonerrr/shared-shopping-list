import { DataSource } from 'typeorm';
import { Item } from './entities/item.entity';

export const itemProviders = [
  {
    provide: 'ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATA_SOURCE'],
  },
];
