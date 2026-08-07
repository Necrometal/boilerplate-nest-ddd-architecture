import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
