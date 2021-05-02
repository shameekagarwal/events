import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CurrentUserMiddleware,
  Queues,
  RequireAuthMiddleware,
} from '@shameek-events/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { AttendRepository } from './models/attend.repository';
import { EventRepository } from './models/event.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([AttendRepository, EventRepository]),
    ClientsModule.register([
      {
        name: Queues.QUERY_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: Queues.QUERY_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes({
      path: ':id',
      method: RequestMethod.POST,
    });
    consumer.apply(RequireAuthMiddleware).forRoutes({
      path: ':id',
      method: RequestMethod.POST,
    });
  }
}
