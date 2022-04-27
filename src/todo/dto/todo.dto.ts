import {
  IsString,
  IsInt,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  MaxLength,
  Matches
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class TodoDTO {

  @IsString()
  // readonly _id?: string;
  readonly _id?: Types.ObjectId;


  @ApiProperty(
    {
      description: 'the todo content',
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30
    }
  )
  // @Matches('[\u4e00-\u9fa5_a-zA-Z0-9_]{1,30}')
  @Matches(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/)
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
      default: 0,
      minimum: 0,
      maximum: 3
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


  @IsBoolean()
  readonly done?: boolean;


  @IsDate()
  readonly createdDatetime?: Date;
}
