import { IFormValidationMessages } from "@app/models/form-validation-messages";

export interface SignUp {
}
export interface ISignUpValidationMessages {
  email: IFormValidationMessages[];
  password: IFormValidationMessages[];
  new_password: IFormValidationMessages[];
  names: IFormValidationMessages[];
  last_names: IFormValidationMessages[];
}
