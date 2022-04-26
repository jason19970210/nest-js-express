import { Document } from 'mongoose';

// where the input data from user-side
export interface ITodoDoc extends Document {
  readonly content: string;
  readonly priority: number;
  readonly done: boolean;
  readonly createdDatetime: Date;
}
