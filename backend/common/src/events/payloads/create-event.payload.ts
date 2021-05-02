// when going through nats, everything is a string
// typecast accordingly

export type CreateEventPayload = {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  date: Date;
  organizerId: number;
  organizerEmail: string;
  image: string;
};
