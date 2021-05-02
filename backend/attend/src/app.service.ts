import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  ToggleAttendPayload,
  Queues,
} from '@shameek-events/common';
import { AttendTogglesAttrs } from './attrs/attend-toggle.attrs';
import { AttendRepository } from './models/attend.repository';
import { EventRepository } from './models/event.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AttendRepository)
    private attendRepository: AttendRepository,
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    @Inject(Queues.QUERY_QUEUE) private queryQueue: ClientProxy,
  ) {}

  getHello(): string {
    return 'attend service up';
  }

  async toggleAttend(data: AttendTogglesAttrs) {
    let attendingStatus = await this.attendRepository.findOne({
      eventId: data.eventId,
      attendeeId: data.attendeeId,
    });
    if (attendingStatus) {
      attendingStatus.attending = !attendingStatus.attending;
    } else {
      const event = await this.eventRepository.findOne({
        id: data.eventId,
      });
      if (!event) {
        throw new BadRequestException(
          `event with id ${data.eventId} doesn't exist`,
        );
      }
      attendingStatus = this.attendRepository.create({
        attendeeId: data.attendeeId,
        attending: true,
        eventId: event.id,
      });
    }
    await attendingStatus.save();
    const attending = attendingStatus.attending;
    this.queryQueue.emit<any, ToggleAttendPayload>(
      EventSubjects.TOGGLE_ATTEND,
      {
        attendeeEmail: data.attendeeEmail,
        attendeeId: attendingStatus.attendeeId,
        attending: attendingStatus.attending,
        eventId: attendingStatus.eventId,
        id: attendingStatus.id,
        version: attendingStatus.version,
      },
    );
    return { attending };
  }

  async createEvent(data: CreateEventPayload) {
    const event = this.eventRepository.create({ id: data.id });
    await event.save();
  }

  async deleteEvent(data: DeleteEventPayload) {
    await this.eventRepository.delete({ id: data.id });
  }
}
