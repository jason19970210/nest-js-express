import mongoose from 'mongoose';

export interface ITodo {
  // _id: string;
  _id:  mongoose.Schema.Types.ObjectId,
  content: string;
  priority: number;
  done: Boolean;
  createdDatetime: Date;
}
