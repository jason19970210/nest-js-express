import {
  IsString,
  IsInt,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength
} from 'class-validator';
import mongoose from 'mongoose';

export class TodoDTO {
  @IsString()
  // readonly _id?: string;
  readonly _id?: mongoose.Schema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  // https://www.npmjs.com/package/class-validator#user-content-passing-context-to-decorators
  @MinLength(1, {
    message: 'Content value must contain 1 - 30 character(s).'
  })
  @MaxLength(30, {
    message: 'Content value must contain 1 - 30 character(s).'
  })
  readonly content: string;

  @IsInt()
  @Min(0, {
    message: 'Priority value must between 0 - 3.'
  })
  @Max(3, {
    message: 'Priority value must between 0 - 3.'
  })
  readonly priority?: number;

  @IsBoolean()
  readonly done?: boolean;

  @IsDate()
  readonly createdDatetime?: Date;
}
