import { Component } from '@angular/core';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  dataSource: any;
  currentDate: Date = new Date();
  googleEvents: any;
  constructor(private calendarService: CalendarService) {
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: async (options) => {
          console.log(options);

          await this.getData()}
      })
    });
  }

  private async getData(): Promise<any> {
    this.googleEvents = this.googleEvents
      ? this.googleEvents
      : (await this.calendarService.getEvents()).data;
  }
}
