import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticatedUser, IResponse, ISignIn, ISignUp } from '@app/models/authentication';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomHttpParams } from '@core/interceptors/custom-http-params';
import { environment } from '@environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticatedUser: IAuthenticatedUser;

  constructor(private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private storageService: StorageService,
  ) { }
  public async login(data: ISignIn): Promise<IAuthenticatedUser> {
    try {
      this.authenticatedUser = (await this.http.post<IResponse>
        (`${environment.urlApi}${environment.endPoints.login}`, data, {
          params: new CustomHttpParams("api-without-token"),
        }).toPromise()).data;
      await this.storageService.setItem("user", JSON.stringify(this.authenticatedUser));
    } catch (error) {
      this.authenticatedUser = null;
    } finally {
      return this.authenticatedUser;
    }
  }

  public signUp(data: ISignUp): Promise<IResponse> {
    return this.http.post<IResponse>
      (`${environment.urlApi}${environment.endPoints.signUp}`, data, {
        params: new CustomHttpParams("api-without-token"),
      }).toPromise();
  }

  async getCurrentAuthenticatedUser(): Promise<IAuthenticatedUser> {
    this.authenticatedUser = this.authenticatedUser
      ? this.authenticatedUser
      : JSON.parse(
        await this.storageService.getItem("user"),
      );
    return this.authenticatedUser;
  }

  async signOut(): Promise<any> {
    this.authenticatedUser = null;
    await this.storageService.removeAll();
  }

  public tokenExpired(token: string): boolean {
    const expiry =
      this.jwtHelperService.decodeToken(token).exp * 1000;
    return new Date().getTime() >= expiry;
  }
}
