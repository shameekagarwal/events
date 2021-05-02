import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  ToggleAttendPayload,
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
    private publisher: Publisher,
  ) {}

  getHello(): string {
    return 'attend service up';
  }

  // this function adds to database if tuple is not present in database
  // else toggles value of field 'attending'
  // then dispatches event
  async toggleAttend(data: AttendTogglesAttrs) {
    let attendingStatus = await this.attendRepository.findOne({
      eventId: data.eventId,
      attendeeId: data.attendeeId,
    });
    if (attendingStatus) {
      attendingStatus.attending = !attendingStatus.attending;
    } else {
      // allow user to attend event only if event exists in the database
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
    this.publisher.emit<string, ToggleAttendPayload>(
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
