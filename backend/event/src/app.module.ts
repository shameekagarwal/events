import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CurrentUserMiddleware,
  RequireAuthMiddleware,
} from '@shameek-events/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { EventRepository } from './models/event.repository';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([EventRepository]),
    NatsStreamingTransport.register({
      clientId: process.env.SERVER_ID,
      clusterId: process.env.NATS_CLUSTER_ID,
      connectOptions: {
        url: process.env.NATS_SERVER_URL,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes(
        { path: '', method: RequestMethod.POST },
        { path: ':id', method: RequestMethod.DELETE },
      );
    consumer
      .apply(RequireAuthMiddleware)
      .forRoutes(
        { path: '', method: RequestMethod.POST },
        { path: ':id', method: RequestMethod.DELETE },
      );
  }
}
