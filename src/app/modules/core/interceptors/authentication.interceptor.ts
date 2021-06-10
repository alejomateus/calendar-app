import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from '@environment';
import { CustomHttpParams } from './custom-http-params';
import { AESEncryptDecryptService } from '@shared/services/aes-encrypt-decrypt.service';
import { AuthenticationService } from '@shared/services/authentication.service';
import { IAuthenticatedUser } from '@app/models/authentication';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  token: string = "";
  constructor(
    private aesEncryptDecryptService: AESEncryptDecryptService,
    private authenticationService: AuthenticationService,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }
  private async handleAccess(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Promise<HttpEvent<any>> {
    let headers = req.headers;

    if (req.params instanceof CustomHttpParams && req.params.type) {
      const autenticatedUser: IAuthenticatedUser = await this.authenticationService.getCurrentAuthenticatedUser();
      if (autenticatedUser) {
        this.token = autenticatedUser.token;
      }
      headers = headers.append("hellobuildkey",
        this.aesEncryptDecryptService.decrypt(environment.helloBuildRequestKey));
      if (req.params.type === "api-with-token") {
        headers = headers.append("Authorization", `Bearer ${this.token}`);
      }
      const authReq = req.clone({
        headers,
      });
      return next.handle(authReq).toPromise();
    }
  }
}
