import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthenticatedUser } from '@app/models/authentication';
import { AuthenticationService } from '../shared/services/authentication.service';
import { LoaderService } from '../shared/services/loader.service';
import { ISignInValidationMessages } from './models/sign-in';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formSignIn: FormGroup;
  signInValidationMessages: ISignInValidationMessages;
  hide: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formSignIn = new FormGroup({
      email: new FormControl("alejo.mateus.ud@gmail.com", [
        Validators.required,
        Validators.pattern(
          "^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
        ),
      ]),
      password: new FormControl("123456", [
        Validators.required,
        // Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^.&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"),
      ])
    });
    this.signInValidationMessages = {
      email: [
        {
          type: "required",
          message: "El email es requerido",
        },
        {
          type: "pattern",
          message: "El email tiene un formato incorrecto",
        },
      ],
      password: [
        { type: "required", message: "La contraseña es requerida" },
        { type: "pattern", message: "La contraseña tiene un formato incorrecto" },
      ],
    };
  }
  async signIn(): Promise<any> {
    try {
      this.loaderService.setSpinnerText("Validando tus credenciales");
      let userData: IAuthenticatedUser = await this.authenticationService.login(this.formSignIn.value);
      if (userData?.user) {
        this.router.navigate(["/repositories"]);
      }
    } catch (error) {
      this.loaderService.hide();
    }
  }
  gotoSignUp(): void {
    this.router.navigate(["/sign-up"]);
  }

}
