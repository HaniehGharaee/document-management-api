import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Get ConfigService from the DI container.
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('appPort');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend origin
    credentials: true, // Allow cookies and other credentials in cross-origin requests
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allow these HTTP methods for cross-origin requests
  });
  await app.listen(port);
}
bootstrap();
