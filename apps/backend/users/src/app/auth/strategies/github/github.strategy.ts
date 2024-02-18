import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

import { ConfigService } from '@backend/config';
import { AuthService } from '../../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3001/auth/github/callback',
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
      await this.authService.addGithubAccount(oldUser, profile.id);
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
    const { id: providerId, emails, displayName, username, photos } = profile;
    const [firstName, lastName] = displayName.split(' ');

    return {
      avatar: photos[0].value,
      email: emails[0].value,
      firstName,
      lastName,
      username,
      githubId: providerId,
    };
  }
}
