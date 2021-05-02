import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (
      !isNaN(value) &&
      parseInt(Number(value).toString()) == value &&
      !isNaN(parseInt(value, 10)) &&
      parseInt(value, 10) > 0
    ) {
      return Number.parseInt(value);
    }
    throw new BadRequestException('id should be an integer greater than 0');
  }
}
