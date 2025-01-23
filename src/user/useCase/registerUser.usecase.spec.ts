import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './registerUser.usecase';
import { UserPrismaRepository } from '../repository/userPrisma.repository';
import { IdDto } from 'src/util/dto/id.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

describe('RegisterUserUseCase', () => {
  const userId = 1
  let registerUserUseCase: RegisterUserUseCase
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
            provide: RegisterUserUseCase,
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

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase)
  });

  it("should be defined", () => {
    expect(registerUserUseCase).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const userDto: CreateUserDto = {
        name: "Luan Tenório",
        email: "lluantenorio7@gmail.com",
        password: "#MyPwd1234"
      }

      await expect(registerUserUseCase.execute(userDto))
        .resolves.toEqual<Awaited<ReturnType<RegisterUserUseCase["execute"]>>>({
          id: userId
        })
    })
  })

})
