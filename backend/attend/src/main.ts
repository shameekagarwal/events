import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { NestFactory } from '@nestjs/core';
import { CustomStrategy } from '@nestjs/microservices';
import { Errorhandler } from '@shameek-events/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new Listener(
      process.env.NATS_CLUSTER_ID,
      process.env.SERVER_ID,
      process.env.SERVICE_NAME,
      { url: process.env.NATS_SERVER_URL },
      {
        durableName: process.env.SERVICE_NAME,
        manualAckMode: true,
        deliverAllAvailable: true,
      },
    ),
  };

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new Errorhandler());
  const microService = app.connectMicroservice(options);
  microService.listen(() => app.listen(process.env.PORT || 3000));
}
bootstrap();
