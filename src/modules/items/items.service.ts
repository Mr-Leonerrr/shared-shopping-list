import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll() {
    return this.itemRepository.find({
      relations: ['list'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['list'],
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.preload({
      id,
      ...updateItemDto,
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.itemRepository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.itemRepository.remove(item);
  }
}
