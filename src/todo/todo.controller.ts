import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  Res,
  Body,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './dto/todo.dto';
import { ValidationPipe } from './shared/pipes/validation.pipe';

@Controller('api')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post('/todo')
  async addTodo(@Res() res, @Body() createTodoDTO: TodoDTO) {
    // @Body(new ValidationPipe())
    // createTodoDTO validation
    const todo = await this.todoService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }

  @Get('/todo')
  async getAllTodo(@Res() res) {
    const todos = await this.todoService.getAllTodo();
    return res.status(HttpStatus.OK).json({
      success: true,
      todos: todos,
    });
  }

  @Get('/todo/:todoID')
  async getTodo(@Res() res, @Param('todoID') todoID: string) {
    // todoID validation
    // boolean
    // if (!idValidation(todoID)) throw new NotFoundException()

    const todo = await this.todoService.getTodo(todoID);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }

  @Patch('/todo')
  async updateTodo(
    @Res() res,
    @Query('todoID') todoID: string,
    @Body() createTodoDTO: TodoDTO,
  ) {
    // todoID validation
    const todo = await this.todoService.updateTodo(todoID, createTodoDTO);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }

  @Delete('/todo')
  async deleteTodo(@Res() res, @Query('todoID') todoID: string) {
    // todoID validation
    const todo = await this.todoService.deleteTodo(todoID);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }
}
