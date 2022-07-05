import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './core/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   '/docs',
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       admin: "adminpass",
  //     },
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('Propine')
    .setDescription('Propine backend API documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'docs',
      name: 'Authorization',
      bearerFormat: 'jwt',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ...configService.getExtraModels(),
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
