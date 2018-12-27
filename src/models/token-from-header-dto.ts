import { IsString } from 'class-validator';

export class TokenDTO {

    @IsString()
    username: string;

    role: any;

    @IsString()
    iat: string;

    @IsString()
    exp: string;

}
