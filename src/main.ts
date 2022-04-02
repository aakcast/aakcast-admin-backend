import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';
import fastifyMultipart from 'fastify-multipart';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/filters/exception.filter';

/**
 * Application entry point
 */
async function bootstrap() {
  const httpAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, httpAdapter);
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors();

  // Register fastify plugins
  await Promise.all([
    // 1. cookie
    app.register(fastifyCookie, {
      secret: configService.get<string>('SECRET_KEY'),
    }),
    // 2. CSRF protection
    app.register(fastifyCsrf),
    // 3. Multipart file upload
    app.register(fastifyMultipart),
  ]);

  // Set API version
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Set global pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // Set global exception filter
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // OpenAPI configuration
  const config = new DocumentBuilder()
    .setTitle('aakcast™ admin backend')
    .setDescription('REST API backend for aakcast™ admin')
    .setVersion('1.0')
    .addTag('App', '앱 기본 기능')
    .addTag('Auth', '인증/인가')
    .addTag('Staffs', '직원 관리')
    .addTag('Sellers', '판매자 관리')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening requests
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
bootstrap();
