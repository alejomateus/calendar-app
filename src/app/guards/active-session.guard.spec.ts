import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { IAuthenticatedUser } from "@app/models/authentication";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationService } from "@shared/services/authentication.service";
import { ActiveSessionGuard } from "./active-session.guard";

describe("ActiveSessionGuard", () => {
  let guard: ActiveSessionGuard;
  let authenticationService: AuthenticationService;

  const spyHelperService = {
    decodeToken() {
      return {
        nickname: "11002323",
      };
    },
  };

  const user: IAuthenticatedUser = {
    "ok": true,
    "user": {
      "id": 1,
      "names": "Alejandro",
      "last_names": "Jimenez",
      "email": "alejo.mateus.ud@gmail.com",
      "active": true,
      "createdAt": "2021-05-15T18:52:39.000Z",
      "updatedAt": "2021-05-15T18:52:39.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lcyI6IkFsZWphbmRybyIsImxhc3RfbmFtZXMiOiJKaW1lbmV6IiwiZW1haWwiOiJhbGVqby5tYXRldXMudWRAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTE1VDE4OjUyOjM5LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTE1VDE4OjUyOjM5LjAwMFoifSwiaWF0IjoxNjIzMDM2NDE0LCJleHAiOjE2MjMxMjI4MTR9.DSYwIbQRm43wqJPqfT2iTBZsB2J0j70vO3GbJMbgaJo"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy("navigate") } },
        { provide: JwtHelperService, useValue: spyHelperService },
      ],
    });
    guard = TestBed.inject(ActiveSessionGuard);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it("when canActivate is called if verifyToken", async () => {
    spyOn(authenticationService, "getCurrentAuthenticatedUser").and.returnValue(
      null,
    );
    spyOn(authenticationService, "tokenExpired").and.returnValue(true);
    guard.canActivate();
    expect(guard).toBeTruthy();
  });
  it("when canActivate is called if verifyToken", async () => {
    spyOn(authenticationService, "getCurrentAuthenticatedUser").and.returnValue(
      user,
    );
    spyOn(authenticationService, "tokenExpired").and.returnValue(true);
    guard.canActivate();
    expect(guard).toBeTruthy();
  });

  it("when canActivate is called if verifyToken", async () => {
    spyOn(authenticationService, "getCurrentAuthenticatedUser").and.returnValue(
      user,
    );
    spyOn(authenticationService, "tokenExpired").and.returnValue(false);
    guard.canActivate();
    expect(guard).toBeTruthy();
  });
});
