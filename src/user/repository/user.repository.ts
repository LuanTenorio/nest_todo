import { CreateUserDto } from "../dto/createUser.dto";
import { PatchUserDto } from "../dto/patchUser.dto";

export interface IUserRepository {
    create(createUserDto: CreateUserDto): Promise<{id: number}>
    patch(patchUserDto: PatchUserDto): Promise<{id: number}>
}