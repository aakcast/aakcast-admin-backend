import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/exception.filter';

async function bootstrap() {
  const serverApp = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, serverApp);

  // Set API version
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Set global pipe for validation
  app.useGlobalPipes(new ValidationPipe());
  // Set global exception filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('aakcast™ REST API backend')
    .setDescription('REST API backend for aakcast™ admin')
    .setVersion('1.0')
    .addTag('Users', 'Manage users')
    .addTag('Auth', 'Authentication including OAuth2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening requests
  await app.listen(3000);
}
bootstrap();
