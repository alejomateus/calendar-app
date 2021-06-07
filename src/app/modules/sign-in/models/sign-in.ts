import { IFormValidationMessages } from "@app/models/form-validation-messages";

export interface SignIn {
}
export interface ISignInValidationMessages {
  email: IFormValidationMessages[];
  password: IFormValidationMessages[];
}
