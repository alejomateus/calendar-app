import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
} from "@angular/router";
import { IAuthenticatedUser } from "@app/models/authentication";
import { AuthenticationService } from "@shared/services/authentication.service";
import { from, Observable } from "rxjs";
/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }
  /**
   * Activate route
   */
  canActivate(): Observable<boolean> {
    return from(this.verifyToken());
  }
  /**
   * verify existing Token
   */
  async verifyToken(): Promise<any> {
    let value = false;
    let token = "";
    let authenticatedUser: IAuthenticatedUser;
    authenticatedUser = this.authenticationService.getCurrentAuthenticatedUser();
    if (authenticatedUser) {
      token = authenticatedUser.token;
    }
    if (
      token &&
      token !== "" &&
      !this.authenticationService.tokenExpired(token)
    ) {
      value = true;
    } else {
      this.authenticationService.signOut();
      this.router.navigate(["/sign-in"]);
    }
    return Promise.resolve(value);
  }
}
