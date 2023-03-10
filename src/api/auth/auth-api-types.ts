export type AuthRequestType = {
  identifier: string;
  password: string;
};
export type RegistrationRequestType = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
export type AuthResponseType = {
  jwt: string;
  user: UserType;
};
export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
};
export type ForgotPasswordRequestType = {
  email: string;
};
export type ForgotPasswordResponseType = {
  ok: boolean;
};
export type ResetPasswordRequestType = {
  password: string;
  passwordConfirmation: string;
  code: string;
};
