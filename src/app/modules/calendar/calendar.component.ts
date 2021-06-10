import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CalendarService } from './services/calendar.service';
import { IGoogleEvent } from './models/calendar';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  dataSource: any;
  currentDate: Date = new Date();
  googleEvents: IGoogleEvent[];
  constructor(private calendarService: CalendarService,
    private loaderService: LoaderService) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.setSpinnerText("Cargando eventos...");
    }, 100);
    this.dataSource = new DataSource({
      store: new CustomStore({
        load: async () => await this.getData()
      })
    });
  }

  private async getData(): Promise<any> {
    this.googleEvents = this.googleEvents ? this.googleEvents : (await this.calendarService.getEvents()).data;
    console.log(this.googleEvents);

    this.loaderService.hide();
    return this.googleEvents;
  }
}
