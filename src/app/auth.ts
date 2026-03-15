import { User } from './user';
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
}
export interface LoginResponse {
  token: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}