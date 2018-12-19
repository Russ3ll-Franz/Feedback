import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';

export class GetUserDTO {

  password: string;

  role: string;
  username: string;
}
