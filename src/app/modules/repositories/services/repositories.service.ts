import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '@app/models/authentication';
import { CustomHttpParams } from '@core/interceptors/custom-http-params';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {
  constructor(private http: HttpClient) { }

  getRepositories(): Promise<IResponse> {
    return this.http.get<IResponse>(`${environment.urlApi}${environment.endPoints.github.repositories}`,
      {
        params: new CustomHttpParams("api-with-token"),
      }).toPromise();
  }

  getProfile(): Promise<IResponse> {
    return this.http.get<IResponse>(`${environment.urlApi}${environment.endPoints.github.profile}`,
      {
        params: new CustomHttpParams("api-with-token"),
      }).toPromise();
  }
}
