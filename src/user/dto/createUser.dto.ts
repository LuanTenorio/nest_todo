import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minLength: 8,
    })
    password: string
}