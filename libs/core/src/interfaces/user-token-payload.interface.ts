export interface IUserTokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;

  iat: number;
  exp: number;
}
