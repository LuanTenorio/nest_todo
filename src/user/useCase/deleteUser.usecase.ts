import { Inject, Injectable } from "@nestjs/common";
import { UserPrismaRepository } from "../repository/userPrisma.repository";

@Injectable()
export class DeleteUserUseCase {

    @Inject("UserRepository")
    userRepo: UserPrismaRepository

    async execute(id: number){
        await this.userRepo.delete(id)
    }

}