// import * as mongoose from 'mongoose';

// export const TodoSchema = new mongoose.Schema({
//     content: { type: String, required: true, minlength: 1, maxLength: 30 },
//     priority: { type: Number, default: 0, min: 0, max: 3 },
//     done: { type: Boolean, default: false },
//     createdDatetime: { type: Date, default: Date.now },
// })

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true, minlength: 1, maxlength: 30 })
  content: string;

  @Prop({ default: 0, min: 0, max: 3 })
  priority: number;

  @Prop({ default: false })
  done: boolean;

  @Prop({ default: Date.now })
  createdDatetime: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
