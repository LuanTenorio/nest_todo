import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';

@Controller('users')
export class UserController {

    @Inject(RegisterUserUseCase)
    registerUserUseCase: RegisterUserUseCase

    @Post()
    async register(@Body() userDto: CreateUserDto) {
        return this.registerUserUseCase.execute(userDto)
    }
}
