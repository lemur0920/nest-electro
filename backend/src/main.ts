import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS API 문서')
    .setVersion('1.0')
    .build();

  const document =
  SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI 경로

  app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
    saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 요청 데이터를 DTO 클래스 인스턴스로 자동 변환
      whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
      disableErrorMessages: false, // production시에는 true로 전환
    })
  );
  // ClassSerializerInterceptor 전역 설정 추가
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
