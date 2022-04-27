import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './interfaces/todo.interface';
import { TodoDTO } from './dto/todo.dto';
import { ITodoDoc } from './interfaces/todo-document.interface';


@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo')
    private readonly todoModel: Model<ITodoDoc>,
  ) { }

  // fetch all todos
  async getAllTodo(): Promise<ITodo[]> {
    const todoDocs = await this.todoModel.find().exec();
    return todoDocs.map((doc) => ({
      _id: doc._id,
      content: doc.content,
      priority: doc.priority,
      done: doc.done,
      createdDatetime: doc.createdDatetime,
    }));
  }

  // get a single todo
  async getTodo(todoID: string): Promise<ITodo> {
    const todo = await this.todoModel.findOne({ _id: todoID }).exec();
    // const todo = await this.todoModel.findById(todoID).exec()
    return {
      _id: todo._id,
      content: todo.content,
      priority: todo.priority,
      done: todo.done,
      createdDatetime: todo.createdDatetime,
    };
  }

  // post a single todo
  async addTodo(todoDTO: TodoDTO): Promise<ITodo> {
    // var todo = await new this.todoModel(todoDTO);
    // return todo.save();

    const todo = await this.todoModel.create(todoDTO as any);
    return {
      _id: todo._id,
      content: todo.content,
      priority: todo.priority,
      done: todo.done,
      createdDatetime: todo.createdDatetime,
    };
  }

  // update a single todo
  async updateTodo(todoID: string, todoDTO: TodoDTO): Promise<ITodo> {
    const todo = await this.todoModel.findByIdAndUpdate(todoID, todoDTO, {
      new: true,
    });
    return {
      _id: todo._id,
      content: todo.content,
      priority: todo.priority,
      done: todo.done,
      createdDatetime: todo.createdDatetime,
    };
  }

  // delete a todo
  async deleteTodo(todoID: string): Promise<ITodo> {
    // https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/
    // const todo = await this.todoModel.deleteOne({_id: todoID});  // type: DeleteResult
    const todo = await this.todoModel.findByIdAndDelete({ _id: todoID });
    // return {
    //   _id: todo._id,
    //   content: todo.content,
    //   priority: todo.priority,
    //   done: todo.done,
    //   createdDatetime: todo.createdDatetime,
    // };
    if (todo === null) {
      return null;
    }
    return {
      _id: todo._id,
      content: todo.content,
      priority: todo.priority,
      done: todo.done,
      createdDatetime: todo.createdDatetime,
    };
  }
}
