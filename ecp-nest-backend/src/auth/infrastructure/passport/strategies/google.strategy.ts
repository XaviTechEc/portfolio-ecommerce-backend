import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { IGoogleUser } from 'src/auth/domain/interfaces/google-user.interface';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private environmentConfigService: EnvironmentConfigService) {
    super({
      clientID: environmentConfigService.getGoogleClientId(),
      clientSecret: environmentConfigService.getGoogleClientSecret(),
      callbackURL: environmentConfigService.getCallbackURL(),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;

    const googleUser: IGoogleUser = {
      profileId: id,
      // Account data
      email: emails[0].value,
      username: emails[0].value,
      fullName: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, googleUser);
  }
}
