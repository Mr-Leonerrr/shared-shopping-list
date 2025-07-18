import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { ItemsController } from './modules/items/items.controller';
import { ListModule } from './modules/list/list.module';
import { ListController } from './modules/list/list.controller';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [UsersModule, ItemsModule, ListModule, GroupModule],
  controllers: [
    AppController,
    UsersController,
    ItemsController,
    ListController,
  ],
  providers: [AppService],
})
export class AppModule {}
