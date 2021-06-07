import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { CustomHttpParams } from '@app/modules/core/interceptors/custom-http-params';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getEvents(): Promise<any> {
    return this.http.get(`${environment.urlApi}${environment.endPoints.googleEvents}`,
      {
        params: new CustomHttpParams("api-with-token"),
      }).toPromise();
  }
}
