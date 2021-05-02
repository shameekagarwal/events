import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { NestFactory } from '@nestjs/core';
import { CustomStrategy } from '@nestjs/microservices';
import { Errorhandler } from '@shameek-events/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new Listener(
      // nats server name
      process.env.NATS_CLUSTER_ID,
      // nats client id = pod's unique identifier
      process.env.SERVER_ID,
      // kind of deployment-name of which the pod is a part
      process.env.SERVICE_NAME,
      { url: process.env.NATS_SERVER_URL },
      {
        // queue-group name = durableName = service name
        // all events that any of the pod in the deployment miss
        // one of te pods in the deployment gets it
        durableName: process.env.SERVICE_NAME,
        // will manually acknowledge the event
        // this way if this pod fails, nats will forward it again to
        // one of the deployments of the pod
        manualAckMode: true,
        // all events that were missed
        // by all clients listening on durableName
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
