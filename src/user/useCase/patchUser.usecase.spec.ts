import { Test, TestingModule } from '@nestjs/testing';
import { UserPrismaRepository } from '../repository/user-prisma.repository';
import { IdDto } from 'src/util/dto/id.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { PatchUserUseCase } from './patchUser.usecase';

describe('PatchUserUseCase', () => {
  const userId = 1
  let patchUserUseCase: PatchUserUseCase
  const mockPrismaValue = mockDeep<PrismaClient>()
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            {
              module: PrismaModule,
              providers: [{
                provide: 'PrismaService',
                useValue: mockPrismaValue,
              },],
              exports: [{
                provide: 'PrismaService',
                useValue: mockPrismaValue,
              }]
            }
          ],
        providers: [
            {
            provide: PatchUserUseCase,
            useValue: {
                execute: jest.fn<Promise<IdDto>, [CreateUserDto]>()
                        .mockImplementation(() => Promise.resolve({id: userId}))
            }
            },
            UserPrismaRepository,
            {
            provide: "UserRepository",
            useExisting: UserPrismaRepository
            },
      ]
    })
      .compile();

    patchUserUseCase = module.get<PatchUserUseCase>(PatchUserUseCase)
  });

  it("should be defined", () => {
    expect(patchUserUseCase).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const userDto: CreateUserDto = {
        name: "Luan Tenório",
        email: "lluantenorio7@gmail.com",
        password: "#MyPwd1234"
      }

      await expect(patchUserUseCase.execute(userId, userDto))
        .resolves.toEqual<Awaited<ReturnType<PatchUserUseCase["execute"]>>>({
          id: userId
        })
    })
  })

})
