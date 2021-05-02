import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class Errorhandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let errors: string[] = [];

    const ctx = host.switchToHttp();

    if (exception instanceof HttpException) {
      try {
        const errorResponse = JSON.parse(
          JSON.stringify(exception.getResponse()),
        );
        errors = Array.isArray(errorResponse.message)
          ? errorResponse.message
          : [errorResponse.message];
      } catch (e) {
        console.log('========\nshouldnt have hapenned, unexpected\n========');
        console.log(exception);
      }
    } else {
      console.log(exception);
    }

    if (!errors.length) {
      errors = ['an unknown error seems to have occured'];
    }

    console.log(errors);

    const response = ctx.getResponse<Response>();
    response.status(500).json({
      errors,
    });
  }
}
