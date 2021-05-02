import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Errorhandler, Queues } from '@shameek-events/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: Queues.QUERY_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservicesAsync();
  app.useGlobalFilters(new Errorhandler());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
