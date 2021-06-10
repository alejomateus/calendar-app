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
  creator: {
    email: string;
  },
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  },
  start: {
    dateTime: string;
    timeZone: string;
  },
  end: {
    dateTime: string;
    timeZone: string;
  },
  iCalUID: string;
  sequence: number;
  attendees: [
    {
      email: string;
      responseStatus: string;
    }
  ],
  reminders: {
    useDefault: boolean;
  },
  eventType: string;
}
