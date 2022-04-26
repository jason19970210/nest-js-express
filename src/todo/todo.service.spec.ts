import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { ITodo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ITodoDoc } from './interfaces/todo-document.interface';

const mockITodo = (
  _id = 'uuid',
  content = 'mock_content',
  priority = 2,
  done = false,
  createdDatetime = new Date('2022-04-26T12:22:56.077Z'),
): ITodo => ({
  _id,
  content,
  priority,
  done,
  createdDatetime,
});

const mockITodoDoc = (mock?: Partial<ITodo>): Partial<ITodoDoc> => ({
  _id: mock?._id || 'uuid',
  content: mock?.content || 'mock_content',
  priority: mock?.priority || 2,
  done: (mock?.done as boolean) || false,
  createdDatetime:
    mock?.createdDatetime || new Date('2022-04-26T12:22:56.077Z'),
});

const todoArray = [
  mockITodo(),
  mockITodo(
    'a new id',
    'mock_content1',
    2,
    false,
    new Date('2022-04-26T12:22:56.077Z'),
  ),
];
const todoDocArray = [
  mockITodoDoc(),
  mockITodoDoc({
    _id: 'a new id',
    content: 'mock_content1',
    priority: 2,
    done: false,
    createdDatetime: new Date('2022-04-26T12:22:56.077Z'),
  }),
];

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<ITodoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockITodo()),
            constructor: jest.fn().mockResolvedValue(mockITodo()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<ITodoDoc>>(getModelToken('Todo'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all todo', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todoDocArray),
    } as any);
    const todos = await service.getAllTodo();
    expect(todos).toEqual(todoArray);
  });

  it('should get a todo by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<ITodoDoc, ITodoDoc>>({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            mockITodoDoc({ _id: 'an id', content: 'abc' }),
          ),
      }) as any,
    );
    const findMockTodo = mockITodo('an id', 'abc');
    const foundTodo = await service.getTodo('an id');
    expect(foundTodo).toEqual(findMockTodo);
  });

  // it('should insert a new todo', async () => {
  //   jest.spyOn(model, 'create').mockImplementationOnce(() => {
  //     Promise.resolve({
  //       _id: 'some id',
  //       content: '123456',
  //       priority: 2,
  //       done: false,
  //       createDatetime: new Date("2022-04-26T12:22:56.077Z"),
  //     })
  //   });
  //   const newTodo = await service.addTodo({
  //     content: '123456',
  //     priority: 2,
  //   });
  //   expect(newTodo).toEqual(mockITodo('some id', "123456", 2, false, new Date("2022-04-26T12:22:56.077Z")));
  // });

  // it.skip('should update a todo', async() => {
  //   jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce(
  //     createMock<Query<ITodoDoc, ITodoDoc>>({
  //       exec: jest.fn().mockResolvedValueOnce({
  //         _id: 'another id',
  //         content: 'update',
  //         priroty: 0
  //       })
  //     }) as any,
  //   );
  //   const updatedTodo = await service.updateTodo()
  // })
});
