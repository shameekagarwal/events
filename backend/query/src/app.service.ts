import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEventPayload,
  DeleteEventPayload,
  ToggleAttendPayload,
} from '@shameek-events/common';
import { AttendRepository } from './models/attend.repository';
import { EventRepository } from './models/event.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    @InjectRepository(AttendRepository)
    private attendRepository: AttendRepository,
  ) {}

  getHello(): string {
    return 'query service up';
  }

  async getEvents() {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect(
        'event.attendees',
        'attend',
        'attend.attending = :attending',
        { attending: true },
      )
      .getMany();
    const mofidifiedResult = events.map((event) => ({
      ...event,
      attendees: event.attendees.map((attendee) => attendee.attendeeEmail),
    }));
    return mofidifiedResult;
  }

  async createEvent(data: CreateEventPayload) {
    const event = this.eventRepository.create({
      date: data.date,
      description: data.description,
      id: data.id,
      image: data.image,
      latitude: data.latitude,
      longitude: data.longitude,
      organizerEmail: data.organizerEmail,
      title: data.title,
    });
    await event.save();
  }

  async deleteEvent(data: DeleteEventPayload) {
    await this.eventRepository.delete({
      id: data.id,
    });
  }

  async toggleAttend(data: ToggleAttendPayload) {
    let attendingStatus = await this.attendRepository.findOne({
      id: data.id,
    });
    if (attendingStatus) {
      // optimistic concurrency control
      if (attendingStatus.version !== data.version - 1) {
        // throwing error so that controller doesnt ack this event
        throw new BadRequestException(`invalid ordering of events`);
      }
      attendingStatus.attending = !attendingStatus.attending;
    } else {
      attendingStatus = this.attendRepository.create({
        attendeeEmail: data.attendeeEmail,
        attending: true,
        // TODO:
        // TYPEORM FIGUREOUT BS
        event: data.eventId as any,
        id: data.id,
      });
    }
    attendingStatus.version = data.version;
    await attendingStatus.save();
  }
}
