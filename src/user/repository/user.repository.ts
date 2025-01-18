import { IdDto } from "src/util/dto/id.dto";
import { CreateUserDto } from "../dto/createUser.dto";
import { PatchUserDto } from "../dto/patchUser.dto";

export interface IUserRepository {
    create(createUserDto: CreateUserDto): Promise<IdDto>
    patch(patchUserDto: PatchUserDto): Promise<IdDto>
    delete(id: number): void
}