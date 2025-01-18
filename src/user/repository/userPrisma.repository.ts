import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { IUserRepository } from "./user.repository";
import { PrismaService } from "../../prisma/prisma.service";
import { PatchUserDto } from "../dto/patchUser.dto";
import { IdDto } from "src/util/dto/id.dto";

@Injectable()
export class UserPrismaRepository implements IUserRepository {

    @Inject(PrismaService)
    prismaService: PrismaService    

    async create(createUserDto: CreateUserDto) {
      return this.prismaService.user.create({
        data: createUserDto,
        select: {
          id: true
        }
      })
    }

    async patch({id, ...patchUserDto}: IdDto & PatchUserDto){
      return await this.prismaService.user.update({
        data: patchUserDto,
        where: {id},
        select: {
          id: true
        }
      })
    }

    async delete(id: number){
      await this.prismaService.user.delete({
        where: {id}
      })
    }
}