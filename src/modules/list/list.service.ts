import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @Inject('LIST_REPOSITORY')
    private listRepository: Repository<List>,
  ) { }

  async create(createListDto: CreateListDto): Promise<List> {
    const list = this.listRepository.create(createListDto);
    return this.listRepository.save(list);
  }

  async findAll(): Promise<List[]> {
    return this.listRepository.find({
      relations: ['group', 'owner', 'items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id },
      relations: ['group', 'owner', 'items'],
    });

    if (!list) {
      throw new Error(`List with id ${id} not found`);
    }

    return list;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.listRepository.preload({
      id,
      ...updateListDto,
    });

    if (!list) {
      throw new Error(`List with id ${id} not found`);
    }

    return this.listRepository.save(list);
  }

  async remove(id: number) {
    const list = await this.findOne(id);
    return this.listRepository.remove(list);
  }
}
