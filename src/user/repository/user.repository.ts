import { CreateUserDto } from "../dto/createUserDto";

export interface IUserRepository {
    create(createUserDto: CreateUserDto): Promise<{id: number}>
}