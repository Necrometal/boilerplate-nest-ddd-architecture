import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // whitelist: strips unknown fields; forbidNonWhitelisted: rejects them
  // instead of silently dropping, so bad clients get a 400 they can act on.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
