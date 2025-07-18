import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
