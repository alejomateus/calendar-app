import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
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

  gotoSignIn(): void {
    this.router.navigate(["/sign-in"]);
  }

}
