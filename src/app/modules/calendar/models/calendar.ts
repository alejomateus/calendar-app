export interface ICalendar {
}

export interface IGoogleEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: ICreator;
  organizer: IOrganizer;
  start: IDateTimeZone;
  end: IDateTimeZone;
  iCalUID: string;
  sequence: number;
  attendees: IAttendees[];
  reminders: IReminder;
  eventType: string;
}

export interface IAttendees {
  email: string;
  responseStatus: string;
}

export interface IDateTimeZone {
  email: string;
  responseStatus: string;
}

export interface IOrganizer {
  email: string;
  displayName: string;
  self: boolean;
}

export interface ICreator {
  email: string;
}

export interface IReminder {
  useDefault: boolean;
}
