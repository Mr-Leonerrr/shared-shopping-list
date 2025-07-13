import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListResponseDto } from './dto/list-response.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  async findAll(): Promise<ListResponseDto[]> {
    const lists = await this.listService.findAll();

    return lists.map((list) => ({
      id: list.id,
      name: list.name,
      description: list.description,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
      owner: {
        id: list.owner.id,
        username: list.owner.username,
      },
      group: list.group ? { id: list.group.id, name: list.group.name } : null,
      items: list.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        note: item.note,
        isCompleted: item.isCompleted,
        createdAt: item.createdAt,
      })),
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
