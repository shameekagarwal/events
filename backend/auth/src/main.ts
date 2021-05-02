import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Errorhandler } from '@shameek-events/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new Errorhandler());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
