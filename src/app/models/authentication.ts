/**
 * Model to ISignIn
 */
export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  names: string;
  last_names: string;
}

export interface IAuthenticatedUser {
  ok: boolean;
  user: IAuthenticatedUserData;
  token: string;
}

export interface IResponse {
  statusCode: number;
  message: string;
  data: any;
}

export interface IAuthenticatedUserData {
  id: number,
  names: string;
  last_names: string;
  email: string;
  active: boolean,
  createdAt: string;
  updatedAt: string;
};
