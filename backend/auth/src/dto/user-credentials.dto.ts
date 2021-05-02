import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must have a valid format' })
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
