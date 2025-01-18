import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./createUser.dto";

export class PatchUserDto extends OmitType(PartialType(CreateUserDto), ["password", "email"]) {

}