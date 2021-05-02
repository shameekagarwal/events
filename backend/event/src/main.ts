import { NestFactory } from '@nestjs/core';
import { Errorhandler } from '@shameek-events/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new Errorhandler());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
