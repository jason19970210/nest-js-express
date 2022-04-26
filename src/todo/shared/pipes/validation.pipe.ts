import { HttpException, HttpStatus } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//     transform(value: any, metadata: ArgumentMetadata) {
//         return value;
//     }
// }

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    // https://docs.nestjs.com/techniques/validation
    // https://stackoverflow.com/questions/55571773/validation-on-optional-parameter-using-class-validator-in-nestjs
    const errors = await validate(object, {
      skipMissingProperties: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
    });

    if (errors.length > 0) {
      console.log('validate errors', errors);
      throw new HttpException('Wrong Format', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number];
    // const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
