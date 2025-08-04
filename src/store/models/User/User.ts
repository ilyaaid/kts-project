export type UserApi = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserModel = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const normalizeUser = (from: UserApi): UserModel => {
  return {
    id: from.id,
    username: from.username,
    email: from.email,
    provider: from.provider,
    confirmed: from.confirmed,
    blocked: from.blocked,
    createdAt: new Date(from.createdAt),
    updatedAt: new Date(from.updatedAt),
  };
};
