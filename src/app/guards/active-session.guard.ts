import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { IAuthenticatedUser } from "@app/models/authentication";
import { AuthenticationService } from "@shared/services/authentication.service";
import { from, Observable } from "rxjs";

/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
export class ActiveSessionGuard implements CanActivate {
  /**
   * Constructor
   * @param router Router,
   * @param jwtHelperService JwtHelperService,
   * @param authenticationService AuthenticationService,
   */
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}
  /**
   * Method to validate route active
   */
  canActivate(): Observable<boolean> {
    return from(this.verifyToken());
  }
  /**
   * Verify Token existing with expiration
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
      !token ||
      token === "" ||
      this.authenticationService.tokenExpired(token)
    ) {
      value = true;
    } else {
      this.router.navigate(["/home"]);
    }
    return Promise.resolve(value);
  }
}
