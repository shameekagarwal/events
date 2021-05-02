import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
  Queues,
} from '@shameek-events/common';
import { UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';
import { CreateEventAttrs } from './attrs/create-event.attrs';
import { DeleteEventAttrs } from './attrs/delete-event.attrs';
import { cloudinary } from './config/cloudinary.config';
import { EventRepository } from './models/event.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    @Inject(Queues.ATTEND_QUEUE) private attendPublisher: ClientProxy,
    @Inject(Queues.QUERY_QUEUE) private queryPublisher: ClientProxy,
  ) {}

  getHello(): string {
    return 'event service up';
  }

  async createEvent(data: CreateEventAttrs) {
    const imageUploadResult = await this.uploadImage(data.image.buffer);
    const event = this.eventRepository.create({
      date: data.date,
      description: data.description,
      image: imageUploadResult.secure_url,
      latitude: data.latitude,
      longitude: data.longitude,
      organizerId: data.organizerId,
      title: data.title,
    });
    await event.save();

    const createEventPayload: CreateEventPayload = {
      date: event.date,
      description: event.description,
      id: event.id,
      image: event.image,
      latitude: event.latitude,
      longitude: event.longitude,
      organizerEmail: data.organizerEmail,
      organizerId: event.organizerId,
      title: event.title,
    };

    this.attendPublisher.emit<any, CreateEventPayload>(
      EventSubjects.CREATE_EVENT,
      createEventPayload,
    );
    this.queryPublisher.emit<any, CreateEventPayload>(
      EventSubjects.CREATE_EVENT,
      createEventPayload,
    );

    return event;
  }

  async deleteEvent(data: DeleteEventAttrs) {
    const event = await this.eventRepository.findOne({
      id: data.id,
    });

    if (!event) {
      throw new NotFoundException(
        `event associated with id ${data.id} not found`,
      );
    }
    if (event.organizerId !== data.organizerId) {
      throw new UnauthorizedException(
        'you need to be the owner of the event to perform this action',
      );
    }

    await this.eventRepository.delete({
      id: data.id,
    });

    const deleteEventPayload: DeleteEventPayload = {
      id: data.id,
    };

    this.attendPublisher.emit<string, DeleteEventPayload>(
      EventSubjects.DELETE_EVENT,
      deleteEventPayload,
    );
    this.queryPublisher.emit<string, DeleteEventPayload>(
      EventSubjects.DELETE_EVENT,
      deleteEventPayload,
    );

    return `event with id ${event.id} deleted successfully`;
  }

  async uploadImage(buffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'events',
          upload_preset: 'ml_default',
        },
        (error: Error, result: UploadApiResponse) => {
          if (result) resolve(result);
          else reject(error);
        },
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }
}
