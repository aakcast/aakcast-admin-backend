import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global pipe for validation
  app.useGlobalPipes(new ValidationPipe());
  // Set global exception filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Start listening requests
  await app.listen(3000);
}
bootstrap();
