import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { UserPrismaRepository } from './repository/userPrisma.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PatchUserUseCase } from './useCase/patchUser.usecase';

@Module({
  controllers: [UserController],
  imports: [
    PrismaModule
  ],
  providers: [
    RegisterUserUseCase,
    PatchUserUseCase,
    UserPrismaRepository,
    {
      provide: "UserRepository",
      useExisting: UserPrismaRepository
    }
  ]
})
export class UserModule { }
