import { Inject } from "@nestjs/common";
import { PatchUserDto } from "../dto/patchUser.dto";
import { UserPrismaRepository } from "../repository/userPrisma.repository";

export class PatchUserUseCase {

    @Inject("UserRepository")
    private readonly userRepo: UserPrismaRepository

    async execute(id: number, patchUserDto: PatchUserDto){
        return this.userRepo.patch({id, ...patchUserDto})
    }
    
}