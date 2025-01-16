import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { UserPrismaRepository } from './repository/user-prisma.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  imports: [
    PrismaModule
  ],
  providers: [
    RegisterUserUseCase,
    UserPrismaRepository,
    {
      provide: "UserRepository",
      useExisting: UserPrismaRepository
    }
  ]
})
export class UserModule { }
