import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    /** 
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1
    }) */

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}
