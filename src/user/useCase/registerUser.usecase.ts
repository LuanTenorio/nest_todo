import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../repository/user.repository";
import { CreateUserDto } from "../dto/createUser.dto";
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
    
    @Inject("UserRepository")
    private readonly userRepo: IUserRepository

    async execute(userDto: CreateUserDto){
        const password = await this.generatePasswordHash(userDto.password)

        return this.userRepo.create({...userDto, password})
    }

    private async generatePasswordHash(password: string){
        const salt = await genSalt()
        const pwdHash = await hash(password, salt)

        return pwdHash 
    }
}