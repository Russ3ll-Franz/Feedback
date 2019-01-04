import { IsString, IsEmail, Length, Matches } from 'class-validator';

export class UserRegisterDTO {

    @IsString()
    @Length(4, 20)
    username: string;

    @IsString()
    @Length(6)
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

}
