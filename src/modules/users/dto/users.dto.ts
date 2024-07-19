import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  role: string;
}
