export enum ModeValue {
  LOGIN = 'login',
  REG = 'reg',
}

export type ModeType = ModeValue.LOGIN | ModeValue.REG;

export interface FormData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
}

export interface RequestBody {
  username?: string;
  email?: string;
  identifier?: string;
  password: string;
}
