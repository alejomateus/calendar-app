import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { DxSchedulerModule } from 'devextreme-angular';
import { CalendarService } from './services/calendar.service';


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    DxSchedulerModule
  ],
  providers: [
    CalendarService
  ]
})
export class CalendarModule { }
