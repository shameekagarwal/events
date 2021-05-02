import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  ToggleAttendPayload,
} from '@shameek-events/common';
import { AppService } from './app.service';

@Controller()
// just listening to events
// TODO:
// 1. create event
// 2. delete event
// 3. attend
// 4. unattend
// no validation pipe needed?
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
  async eventCreateListener(
    @Payload() payload: CreateEventPayload,
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.appService.createEvent(payload);
    // acknowledge the successfull completeion of work by listener
    // if not 'acked', event gets thrown back to nats bus
    // which then forwards the event to another pod
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

  //   TODO:
  // ADD MODEL, UPDATE DB, REFORMULATE QUERY
  @EventPattern(EventSubjects.TOGGLE_ATTEND)
  async toggleAttend(
    @Payload() payload: ToggleAttendPayload,
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.appService.toggleAttend(payload);
    context.message.ack();
  }
}
