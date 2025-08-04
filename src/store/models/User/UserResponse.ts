import { normalizeUser, UserApi, UserModel } from './User';

export type UserResponseApi = {
  jwt: string;
  user: UserApi;
};

export type UserResponseModel = {
  jwt: string;
  user: UserModel;
};

export const normalizeUserResponse = (from: UserResponseApi): UserResponseModel => {
  return {
    jwt: from.jwt,
    user: normalizeUser(from.user),
  };
};
