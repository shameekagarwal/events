export type ToggleAttendPayload = {
  id: number;
  eventId: number;
  attendeeId: number;
  attendeeEmail: string;
  attending: boolean;
  version: number;
};
