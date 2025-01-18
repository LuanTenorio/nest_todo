import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PingDto } from './util/dto/ping.dto';

@Controller()
export class AppController {

  @Post("ping")
  ping(@Body(new ValidationPipe()) body: PingDto) {
    return !body.ping;
  }
}
