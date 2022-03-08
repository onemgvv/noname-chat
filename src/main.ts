import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import secureSession from 'fastify-secure-session';
import compression from 'fastify-compress';
// import fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // register requests compression
  app.register(compression, { encodings: ['gzip', 'deflate'] });

  // register session fastify middleware
  app.register(secureSession, {
    key: Buffer.from(process.env.SESSION_KEY, 'hex'),
  });

  // register fastify cookie middleware
  // app.register(fastifyCookie, {
  //   secret: process.env.COOKIE_SECRET
  // })

  // use global validation pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // set global prefix "api"
  app.setGlobalPrefix('api');

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Democracy API Documentation')
    .setDescription('Democracy API Documentation created with OpenAPI')
    .setVersion('1.0')
    .addTag('application')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // listen app on PORT from .env
  await app.listen(PORT, async () => {
    // receive app link
    const url = await app
      .getUrl()
      .catch((err) => console.log('[ERROR]: ', err));

    console.log(`Application started on: ${url}`);
  });
}
bootstrap();
