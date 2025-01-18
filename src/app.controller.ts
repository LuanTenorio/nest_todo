import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { PingDto } from './ping.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("ping")
  ping(@Body(new ValidationPipe()) body: PingDto) {
    return !body.ping;
  }
}
