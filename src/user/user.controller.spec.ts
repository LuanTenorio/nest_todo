import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { CreateUserDto } from './dto/createUser.dto';
import { IdDto } from 'src/util/dto/id.dto';
import { PatchUserUseCase } from './useCase/patchUser.usecase';
import { PatchUserDto } from './dto/patchUser.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('UserController', () => {
  const userId = 1
  let controller: UserController
  let registerUserUseCase: RegisterUserUseCase
  let patchUserUseCase: PatchUserUseCase
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: RegisterUserUseCase,
          useValue: {
            execute: jest.fn<Promise<IdDto>, [CreateUserDto]>()
                      .mockImplementation(() => Promise.resolve({id: userId}))
          }
        },
        {
          provide: PatchUserUseCase,
          useValue: {
            execute: jest.fn<Promise<IdDto>, [CreateUserDto]>()
                      .mockImplementation(() => Promise.resolve({id: userId}))
          }
        },
      ]
    })
      .compile();

    controller = module.get<UserController>(UserController);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase)
    patchUserUseCase = module.get<PatchUserUseCase>(PatchUserUseCase)
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(registerUserUseCase).toBeDefined();
    expect(patchUserUseCase).toBeDefined();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const userDto: CreateUserDto = {
        name: "Luan Tenório",
        email: "lluantenorio7gmail.com",
        password: "#MyPwd1234"
      }

      await expect(controller.register(userDto))
        .resolves.toEqual<Awaited<ReturnType<UserController["register"]>>>({
          id: userId
        })
    })

    it("userDto validation", async () => {
      let createUserTestDto: CreateUserDto = {
        name: "ana",
        email: "lluantenorio7@gmail.com",
        password: "#MyPwd1234"
      }

      const myDtoObject = plainToInstance(CreateUserDto, createUserTestDto)
      const err = await validate(myDtoObject)
      expect(err.length).toBe(0)

    })
  })

  describe("patch", () => {
    it("should patch a new user", async () => {
      const userDto: PatchUserDto = {
        name: "Luan Tenório",
        email: "lluantenorio7@gmail.com"
      }

      await expect(controller.patch(userId, userDto))
        .resolves.toEqual<Awaited<ReturnType<UserController["patch"]>>>({
          id: userId
        })
    })
  })
});
