import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './todo/shared/pipes/validation.pipe';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); // pipe implementation

  // https://docs.nestjs.com/security/csrf
  // app.use(csurf());

  app.enableShutdownHooks();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Todo API Docs'
  }

  const config = new DocumentBuilder()
    .setTitle('Todo API Documentation')
    .setDescription('The Todo API description based on RFC 2616')
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(8082);
}
bootstrap();
