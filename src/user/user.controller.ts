import { Body, Controller, Delete, Inject, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { PatchUserUseCase } from './useCase/patchUser.usecase';
import { PatchUserDto } from './dto/patchUser.dto';
import { DeleteUserUseCase } from './useCase/deleteUser.usecase';

@Controller('users')
export class UserController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly patchUserUseCase: PatchUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ){}

    @Post()
    async register(@Body() userDto: CreateUserDto) {
        return this.registerUserUseCase.execute(userDto)
    }

    @Patch(":id")
    async patch(@Param("id", ParseIntPipe) id: number, @Body() patchDto: PatchUserDto) {
        return this.patchUserUseCase.execute(id, patchDto)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        return this.deleteUserUseCase.execute(id)
    }
}
