import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { LoaderService } from '@shared/services/loader.service';
import { DialogService } from '../shared/services/dialog.service';
import { ISignUpValidationMessages } from './models/sign-in';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;
  signUpValidationMessages: ISignUpValidationMessages;
  hide: boolean = true;
  @ViewChild("signUpError", { static: true }) tsignUpError: TemplateRef<any>;
  @ViewChild("signUpDone", { static: true }) tsignUpDone: TemplateRef<any>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  validateEqualValues(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const new_password = control.get('new_password');
    return password.value === new_password.value ? null : { 'noEquals': true };
  }

  initForm(): void {
    this.formSignUp = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
        ),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^.&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"),
      ]),
      new_password: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^.&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"),
      ]),
      names: new FormControl("", [
        Validators.required,
      ]),
      last_names: new FormControl("", [
        Validators.required,
      ])
    }, {
      validators: this.validateEqualValues
    });
    this.signUpValidationMessages = {
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
      new_password: [
        { type: "required", message: "La nueva contraseña es requerida" },
        { type: "pattern", message: "La nueva contraseña tiene un formato incorrecto" },
        { type: "noEquals", message: "Las contraseñas no son iguales" }
      ],
      names: [
        {
          type: "required",
          message: "El campo nombres es requerido",
        },
      ],
      last_names: [
        {
          type: "required",
          message: "El campo apellidos es requerido",
        },

      ],
    };
  }

  async signUp(): Promise<any> {
    try {
      this.loaderService.setSpinnerText("Validando tus datos...");
      await this.authenticationService.signUp(this.formSignUp.value);
      this.dialogService.openDialog(this.tsignUpDone);
      this.formSignUp.reset();
    } catch (error) {
      this.dialogService.openDialog(this.tsignUpError);
    } finally {
      this.loaderService.hide();
    }
  }
  gotoSignIn(): void {
    this.router.navigate(["/sign-in"]);
  }

  async closeDialog(event: boolean): Promise<any> {
    if (event) {
      this.gotoSignIn();
    }
  }

}
