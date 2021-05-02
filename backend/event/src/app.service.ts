import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEventPayload,
  DeleteEventPayload,
  EventSubjects,
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
    private publisher: Publisher,
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

    // TODO:
    // no await etc on event, to reduce latency
    // should be ideal to enclose in a transaction?
    this.publisher.emit<string, CreateEventPayload>(
      EventSubjects.CREATE_EVENT,
      {
        date: event.date,
        description: event.description,
        id: event.id,
        image: event.image,
        latitude: event.latitude,
        longitude: event.latitude,
        organizerEmail: data.organizerEmail,
        organizerId: event.organizerId,
        title: event.title,
      },
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
    this.publisher.emit<string, DeleteEventPayload>(
      EventSubjects.DELETE_EVENT,
      {
        id: data.id,
      },
    );
    return `event with id ${event.id} deleted successfully`;
  }

  // TODO:
  // set limit of 100KB on frontend according to status code
  // 413 Request Entity Too Large
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
