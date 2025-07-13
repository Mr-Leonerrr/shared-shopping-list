import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { listProviders } from './list.providers';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...listProviders, ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
