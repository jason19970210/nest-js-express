import {
  IsString,
  IsInt,
  IsDate,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class TodoDTO {
  @IsString()
  readonly _id?: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsInt()
  readonly priority?: number;

  @IsBoolean()
  readonly done?: boolean;

  @IsDate()
  readonly createdDatetime?: Date;
}
