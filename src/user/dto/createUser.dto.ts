import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(3)
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
    @MaxLength(60)
    password: string
}