import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { RegisterUserUseCase } from './useCase/registerUser.usecase';
import { CreateUserDto } from './dto/createUser.dto';
import { IdDto } from 'src/util/dto/id.dto';
import { PatchUserUseCase } from './useCase/patchUser.usecase';
import { PatchUserDto } from './dto/patchUser.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DeleteUserUseCase } from './useCase/deleteUser.usecase';

describe('UserController', () => {
  const userId = 1
  let controller: UserController
  let registerUserUseCase: RegisterUserUseCase
  let patchUserUseCase: PatchUserUseCase
  let deleteUserUseCase: DeleteUserUseCase
  
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
            execute: jest.fn<Promise<IdDto>, [number, PatchUserDto]>()
                      .mockImplementation(() => Promise.resolve({id: userId}))
          }
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn<Promise<void>, [number]>()
                      .mockImplementation(() => Promise.resolve())
          }
        },
      ]
    })
      .compile();

    controller = module.get<UserController>(UserController);
    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase)
    patchUserUseCase = module.get<PatchUserUseCase>(PatchUserUseCase)
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase)
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(registerUserUseCase).toBeDefined();
    expect(patchUserUseCase).toBeDefined();
    expect(deleteUserUseCase).toBeDefined();
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
    it("should patch a user", async () => {
      const userDto: PatchUserDto = {
        name: "Luan Tenório"
      }

      await expect(controller.patch(userId, userDto))
        .resolves.toEqual<Awaited<ReturnType<UserController["patch"]>>>({
          id: userId
        })
    })
  })

  describe("delete", () => {
    it("should delete a user", async () => {

      await expect(controller.delete(userId))
        .resolves.not.toEqual(Promise.resolve())
    })
  })
});
