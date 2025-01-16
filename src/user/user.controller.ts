import { Body, Controller, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { PatchUserUseCase } from './useCase/patchUser.usecase';

@Controller('users')
export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly patchUserUseCase: PatchUserUseCase
    ){}

    @Post()
    async register(@Body() userDto: CreateUserDto) {
        return this.registerUserUseCase.execute(userDto)
    }

    @Patch(":id")
    async patch(@Param("id", ParseIntPipe) id, @Body() patchDto: CreateUserDto) {
        return this.patchUserUseCase.execute(id, patchDto)
    }
}
