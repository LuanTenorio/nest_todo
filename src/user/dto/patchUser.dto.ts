import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from "./createUser.dto";

export class PatchUserDto extends OmitType(CreateUserDto, ["password"]) {

}