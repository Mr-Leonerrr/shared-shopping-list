import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

describe('ListController', () => {
  let controller: ListController;
  let service: ListService;

  const mockList = {
    id: 1,
    name: 'Groceries',
    description: 'Weekly groceries',
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: { id: 1, username: 'john' },
    group: { id: 3, name: 'Family' },
    items: [
      {
        id: 10,
        name: 'Milk',
        quantity: 2,
        price: 3.5,
        note: 'Low fat',
        isCompleted: false,
        createdAt: new Date(),
      },
    ],
  };

  const mockListService = {
    create: jest.fn().mockImplementation((dto: CreateListDto) => ({
      id: 1,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: { id: 2, username: 'john' },
      group: null,
      items: [],
    })),
    findAll: jest.fn().mockResolvedValue([mockList]),
    findOne: jest.fn().mockImplementation((id: number) => ({
      ...mockList,
      id,
    })),
    update: jest.fn().mockImplementation((id: number, dto: UpdateListDto) => ({
      ...mockList,
      ...dto,
      id,
    })),
    remove: jest.fn().mockImplementation((id: number) => ({ deleted: true, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [
        { provide: ListService, useValue: mockListService },
      ],
    }).compile();

    controller = module.get<ListController>(ListController);
    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return the result', async () => {
      const dto: CreateListDto = { name: 'Groceries', description: 'Weekly groceries', ownerId: 1 };
      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(dto.name);
    });
  });

  describe('findAll', () => {
    it('should return mapped list response', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: mockList.id,
          name: mockList.name,
          description: mockList.description,
          createdAt: mockList.createdAt,
          updatedAt: mockList.updatedAt,
          owner: {
            id: mockList.owner.id,
            username: mockList.owner.username,
          },
          group: {
            id: mockList.group.id,
            name: mockList.group.name,
          },
          items: [
            {
              id: mockList.items[0].id,
              name: mockList.items[0].name,
              quantity: mockList.items[0].quantity,
              price: mockList.items[0].price,
              note: mockList.items[0].note,
              isCompleted: mockList.items[0].isCompleted,
              createdAt: mockList.items[0].createdAt,
            },
          ],
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id and return the result', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('should call service.update with id and dto and return the result', async () => {
      const dto: UpdateListDto = { name: 'Updated List', description: 'Updated desc' };
      const result = await controller.update('1', dto);
      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result.name).toBe(dto.name);
    });
  });

  describe('remove', () => {
    it('should call service.remove with id and return the result', async () => {
      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true, id: 1 });
    });
  });
});
