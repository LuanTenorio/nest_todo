import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/createUserDto";
import { IUserRepository } from "./user.repository";
import { PrismaService } from "src/prisma/prisma.service";

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

}