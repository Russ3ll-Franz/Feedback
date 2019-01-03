import { IsString, IsEmail } from 'class-validator';

export class UserRegisterDTO {

    @IsString()
    username: string;
    @IsString()
    // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
    password: string;
    @IsEmail()
    email: string;
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
}
