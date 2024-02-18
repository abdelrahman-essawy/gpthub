import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { ConfigService } from '@backend/config';

import { AuthService } from '../../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const user = await this.authService.findOneBy({ googleId: profile.id });
    if (user) {
      this.logger.log(`User found: ${user.email}`);
      return await this.authService.login(user);
    }
    const oldUser = await this.authService.findOneBy({
      email: profile.emails[0].value,
    });
    if (oldUser) {
      this.logger.log(`Updating user: ${oldUser.email}`);
      await this.authService.addGoogleAccount(oldUser, profile.id);
      return await this.authService.login(oldUser);
    }
    const newUser = await this.register(profile);
    return await this.authService.login(newUser);
  }

  private async register(profile: Profile) {
    const user = this.extractUser(profile);

    this.logger.log(`Registering new user: ${user.email}`);
    return await this.authService.register({
      ...user,
      password: null,
    });
  }

  private extractUser(profile: Profile) {
    const { id: providerId, emails, name, photos } = profile;
    const { givenName, familyName } = name;

    return {
      avatar: photos[0].value,
      email: emails[0].value,
      firstName: givenName,
      lastName: familyName,
      username: this.generateUsername(emails[0].value),
      googleId: providerId,
    };
  }

  private generateUsername(email: string) {
    const [username] = email.split('@');
    return username;
  }
}
