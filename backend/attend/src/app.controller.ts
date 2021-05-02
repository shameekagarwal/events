import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EventPattern, Payload, Ctx } from '@nestjs/microservices';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  IdValidationPipe,
} from '@shameek-events/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post(':id')
  async toggleAttend(
    @Param('id', IdValidationPipe) eventId: number,
    @Req() request: Request,
  ) {
    const response = await this.appService.toggleAttend({
      eventId,
      attendeeId: request.currentUser.id,
      attendeeEmail: request.currentUser.email,
    });
    return response;
  }

  @EventPattern(EventSubjects.CREATE_EVENT)
  async eventCreateListener(
    @Payload() payload: CreateEventPayload,
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.appService.createEvent(payload);
    context.message.ack();
  }

  @EventPattern(EventSubjects.DELETE_EVENT)
  async eventDeleteListener(
    @Payload() payload: DeleteEventPayload,
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.appService.deleteEvent(payload);
    context.message.ack();
  }
}
