import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
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
  async eventCreateListener(payload: CreateEventPayload) {
    await this.appService.createEvent(payload);
  }

  @EventPattern(EventSubjects.DELETE_EVENT)
  async eventDeleteListener(payload: DeleteEventPayload) {
    await this.appService.deleteEvent(payload);
  }
}
