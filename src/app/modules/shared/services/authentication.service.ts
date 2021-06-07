import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthenticatedUser, IResponse, ISignIn } from '@app/models/authentication';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomHttpParams } from '@core/interceptors/custom-http-params';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticatedUser: IAuthenticatedUser;

  constructor(private http: HttpClient,
    private jwtHelperService: JwtHelperService,
  ) { }
  public async login(data: ISignIn): Promise<IAuthenticatedUser> {
    try {
      this.authenticatedUser = (await this.http.post<IResponse>
        (`${environment.urlApi}${environment.endPoints.login}`, data, {
          params: new CustomHttpParams("api-without-token"),
        }).toPromise()).data;
      localStorage.setItem("user", JSON.stringify(this.authenticatedUser));
    } catch (error) {
      this.authenticatedUser = null;
    } finally {
      return this.authenticatedUser;
    }
  }

  public getCurrentAuthenticatedUser(): IAuthenticatedUser {
    this.authenticatedUser
      ? this.authenticatedUser
      : JSON.parse(
        localStorage.getItem("user"),
      );
    return this.authenticatedUser;
  }

  public signOut(): void {
    this.authenticatedUser = null;
    localStorage.clear();
  }

  public tokenExpired(token: string): boolean {
    const expiry =
      this.jwtHelperService.decodeToken(token).exp * 1000;
    return new Date().getTime() >= expiry;
  }
}
