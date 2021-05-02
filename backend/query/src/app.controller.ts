import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  ToggleAttendPayload,
} from '@shameek-events/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('events')
  async getEvents() {
    const events = await this.appService.getEvents();
    return { events };
  }

  @EventPattern(EventSubjects.CREATE_EVENT)
  async eventCreateListener(payload: CreateEventPayload) {
    await this.appService.createEvent(payload);
  }

  @EventPattern(EventSubjects.DELETE_EVENT)
  async eventDeleteListener(payload: DeleteEventPayload) {
    await this.appService.deleteEvent(payload);
  }

  @EventPattern(EventSubjects.TOGGLE_ATTEND)
  async toggleAttend(payload: ToggleAttendPayload) {
    await this.appService.toggleAttend(payload);
  }
}
