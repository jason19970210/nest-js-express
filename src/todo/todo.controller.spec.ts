import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let todoController: TodoController;

  let todoService: TodoService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [TodoService],
  //     controllers: [TodoController],
  //   }).compile();

  //   todoController = module.get<TodoController>(TodoController);
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TodoService,
          useValue: {
            // getAllTodo: jest.fn().mockResolvedValue([
            //   { name: 'Test Cat 1', breed: 'Test Breed 1', age: 4 },
            //   { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
            //   { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
            // ]),
            // getOneByName: jest
            //   .fn()
            //   .mockImplementation((name: string) =>
            //     Promise.resolve({ name, breed: 'Test Breed 1', age: 4 }),
            //   ),
          },
        },
      ],
      controllers: [TodoController],
    }).compile();

    todoController = module.get<TodoController>(TodoController);

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  // describe('getCats', () => {
  //   it('should get an array of cats', () => {
  //     expect(todoController.getAllTodo).resolves.toEqual([
  //       { name: 'Test Cat 1', breed: 'Test Breed 1', age: 4 },
  //       { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
  //       { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
  //     ]);
  //   });
  // });

  // describe('root', () => {
  //   it('should return', (done) => {
  //     // expect(todoController.addTodo).toEqual(Response)
  //     console.log(todoController.addTodo)
  //     expect(todoController.addTodo.prototype).toBe('2')
  //   })
  // })
});
