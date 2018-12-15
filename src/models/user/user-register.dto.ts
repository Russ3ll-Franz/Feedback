import { IsString, Length, Matches, IsOptional, IsEmail, Allow } from 'class-validator';

export class UserRegisterDTO {

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;
 // Allow decorator make possible columns to be included in body request
  @Allow()
  username: string;

  @Allow()
  firstName: string;

  @Allow()
  lastName: string;

  @Allow()
  role: string;

  // @IsOptional()
  // avatarUrl: string;
}
