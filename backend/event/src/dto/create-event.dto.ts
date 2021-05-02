import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsDateString({}, { message: 'date format must be valid' })
  date: Date;

  @IsNotEmpty()
  @IsNumberString()
  latitude: string;

  @IsNotEmpty()
  @IsNumberString()
  longitude: string;
}
