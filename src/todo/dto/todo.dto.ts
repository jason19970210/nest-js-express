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
import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {

  @ApiProperty(
    {
      description: 'the document(record) unique id',
      type: 'mongoose.Schema.Types.ObjectId',
    }
  )
  @IsString()
  // readonly _id?: string;
  readonly _id?: mongoose.Schema.Types.ObjectId;



  @ApiProperty(
    {
      description: 'the todo content',
      type: String,
      required: true
    }
  )
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



  @ApiProperty(
    {
      description: 'the todo priority',
      type: Number,
      required: true,
      default: 0
    }
  )
  @IsInt()
  @Min(0, {
    message: 'Priority value must between 0 - 3.'
  })
  @Max(3, {
    message: 'Priority value must between 0 - 3.'
  })
  readonly priority?: number;


  @ApiProperty(
    {
      description: 'the todo statement',
      type: Boolean,
      default: false
    }
  )
  @IsBoolean()
  readonly done?: boolean;


  @ApiProperty(
    {
      description: 'the create datetime of todo',
      type: Date,
      default: 'Date.now()'
    }
  )
  @IsDate()
  readonly createdDatetime?: Date;
}
