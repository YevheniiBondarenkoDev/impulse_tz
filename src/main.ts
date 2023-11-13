import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: '*',
  });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('Overview of all API endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Provide jwt for getting access to resource',
        in: 'header',
      },
      'JWT',
    );
  const config = swaggerOptions.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      stopAtFirstError: true,
    }),
  );
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();
