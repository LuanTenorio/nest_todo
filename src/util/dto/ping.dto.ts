import { IsBoolean } from "class-validator";

export class PingDto {

    @IsBoolean()
    ping: boolean
}