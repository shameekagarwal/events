import { ImageType } from 'src/types/image.type';

export interface CreateEventAttrs {
  title: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
  image: ImageType;
  // stored in event-db to authorize only owner can delete event
  organizerId: number;
  // used to dispatch event for query service to store
  // query service doesnt need authentication etc
  // just displays event details with organizer email
  organizerEmail: string;
}
