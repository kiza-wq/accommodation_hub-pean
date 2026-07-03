export interface AuthUser {
  email: string;
  image: string;
  name: string;
  id: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}
