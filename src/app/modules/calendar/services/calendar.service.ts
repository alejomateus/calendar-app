import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment';
import { CustomHttpParams } from '@core/interceptors/custom-http-params';
import { IResponse } from '@app/models/authentication';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  params = {
    params: new CustomHttpParams("api-with-token"),
  };
  constructor(private http: HttpClient) { }

  getEvents(): Promise<IResponse> {
    return this.http.get<IResponse>(`${environment.urlApi}${environment.endPoints.googleEvents}`,
      this.params).toPromise();
  }


  createEvent(data: any): Promise<IResponse> {
    return this.http.post<IResponse>(`${environment.urlApi}${environment.endPoints.googleEvents}`,
      data,
      this.params).toPromise();
  }


  deleteEvent(eventId: string): Promise<IResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        eventId
      },
      params: this.params.params
    };
    return this.http.delete<IResponse>(`${environment.urlApi}${environment.endPoints.googleEvents}`,
    options).toPromise();
  }
}
