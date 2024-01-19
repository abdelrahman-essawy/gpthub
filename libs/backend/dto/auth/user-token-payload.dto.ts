import { IUserTokenPayload } from '@core';

export class UserTokenPayloadDto implements IUserTokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;

  constructor(tokenPayload: UserTokenPayloadDto) {
    this.id = tokenPayload.id;
    this.username = tokenPayload.username;
    this.email = tokenPayload.email;
    this.role = tokenPayload.role;
  }
}
