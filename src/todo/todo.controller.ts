import {
  Controller,
  Get,
  Post,
  Put,
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api')
export class TodoController {
  constructor(private todoService: TodoService) {}


  
  @Post('/todo')
  @ApiOperation({ summary: 'add a new todo'})
  @ApiResponse({ status: 201, description: 'add new todo successful' })
  async addTodo(@Res() res, @Body() createTodoDTO: TodoDTO) {
    // @Body(new ValidationPipe())
    const todo = await this.todoService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }

  @Get('/todo')
  @ApiOperation({ summary: 'get all todos'})
  @ApiResponse({ status: 200, description: 'get all todos successful' })
  async getAllTodo(@Res() res) {
    const todos = await this.todoService.getAllTodo();
    return res.status(HttpStatus.OK).json({
      success: true,
      todos: todos,
    });
  }

  @Get('/todo/:todoID')
  @ApiOperation({ summary: 'get a todo with todoID'})
  @ApiResponse({ status: 200, description: 'get a todo with todoID successful' })
  async getTodo(@Res() res, @Param('todoID') todoID: string) {
    const todo = await this.todoService.getTodo(todoID);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }


  @Put('/todo')
  @ApiOperation({ summary: 'update a todo'})
  @ApiResponse({ status: 200, description: 'update todo successful' })
  async updateTodo(
    @Res() res,
    @Query('todoID') todoID: string,
    @Body() createTodoDTO: TodoDTO,
  ) {

    const todo = await this.todoService.updateTodo(todoID, createTodoDTO);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }

  @Delete('/todo')
  @ApiOperation({ summary: 'delete a todo'})
  @ApiResponse({ status: 200, description: 'delete todo successful' })
  async deleteTodo(@Res() res, @Query('todoID') todoID: string) {
    const todo = await this.todoService.deleteTodo(todoID);
    if (!todo) throw new NotFoundException('Non-exist todo ID');
    // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/204
    return res.status(HttpStatus.OK).json({
      success: true,
      todo: todo,
    });
  }
}
