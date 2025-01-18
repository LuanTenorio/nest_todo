import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({ 
    forbidNonWhitelisted: true, 
    transform: true, 
    whitelist: true 
  }));
  await app.listen(process.env.PORT);
}
bootstrap();
