import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CheckBanInterceptor } from '@interceptors/check-ban.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  // register requests compression
  app.use(compression());

  // register session middleware
  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'none',
        domain: 'https://noname.fun',
        httpOnly: true,
      },
    }),
  );

  // register cookie middleware
  app.use(cookieParser());

  // enable cors
  app.enableCors({
    origin: ['https://noname.fun', 'https://acps.noname.fun'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
    credentials: true,
  });

  // use global validation pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // set global prefix "api"
  app.setGlobalPrefix('api');
  // global interceptors
  app.useGlobalInterceptors(new CheckBanInterceptor());

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Noname Backend API Documentation')
    .setDescription('Noname Backend API Documentation created with OpenAPI')
    .setVersion('1.0')
    .addTag('application')
    .addBearerAuth()
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
