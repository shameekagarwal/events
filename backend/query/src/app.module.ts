import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { AttendRepository } from './models/attend.repository';
import { EventRepository } from './models/event.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([EventRepository, AttendRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
