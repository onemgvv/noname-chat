import { Devices } from '@common/types/app.types';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import AppleAuth, { AppleIdTokenType } from 'apple-signin-auth';
import { existsSync, readFileSync } from 'fs';
import { AppleLoginDto } from '@api/auth/dto/apple-login.dto';
import { DeviceType } from '@enums/device-type.enum';
import { AxiosResponse } from 'axios';
import { VkTokenPayload } from '@auth/interface/vk-payload.interface';
import { ISocialAuthService } from '@auth/interface/sauth-service.interface';

export type Platform = 'mobile' | 'web';

@Injectable()
export class SocialAuthService implements ISocialAuthService {
  private secretKey: string;

  private secretPath: string = process.cwd() + '/src/secrets/apple-key.p8';

  constructor(private http: HttpService) {
    if (existsSync(this.secretPath)) {
      this.secretKey = readFileSync(this.secretPath, 'utf-8');
    }
  }

  async receiveGoogleUser(token: string): Promise<TokenPayload> {
    const GoogleClient = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    const googleData = await GoogleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = googleData.getPayload();
    return payload;
  }

  async receiveAppleUser(
    appleLoginData: AppleLoginDto,
  ): Promise<AppleIdTokenType> {
    const clientSecret = AppleAuth.getClientSecret({
      clientID: 'fun.noname.reg',
      privateKey: this.secretKey,
      teamID: process.env.APPLE_TEAM_ID,
      keyIdentifier: process.env.APPLE_KEY_ID,
    });

    const redirectUri = await this.getRedirectUri(appleLoginData.type);

    const response = await AppleAuth.getAuthorizationToken(
      appleLoginData.authorizationCode,
      {
        clientSecret,
        clientID: 'fun.noname.reg',
        redirectUri: redirectUri,
      },
    );

    if (!response?.id_token) {
      throw new UnauthorizedException(
        `Access token cannot be retrieved from Apple: ${JSON.stringify(
          response,
        )}`,
      );
    }

    const payload = await AppleAuth.verifyIdToken(response.id_token, {
      audience: 'fun.noname.reg',
      ignoreExpiration: true,
    });

    return payload;
  }

  async receiveVkUser(
    code: string,
    platform: Platform,
  ): Promise<VkTokenPayload> {
    console.log('code: ', code);
    const res = await this.getTokenByCode(code, platform);

    const userId = res.data.user_id;
    const token = res.data.access_token;

    const { data } = await this.http
      .get(
        `${process.env.VK_USER_URI}?user_ids=${userId}&fields=bdate,city,sex&access_token=${token}&v=5.131`,
      )
      .toPromise();

    console.log('data: ', data);

    if (data.error)
      throw new UnprocessableEntityException('Invalide access token');

    return {
      userId,
      email: res.data.email,
      profile: data.response[0],
    };
  }

  private async getTokenByCode(
    code: string,
    platform: Platform,
  ): Promise<AxiosResponse<any, any>> {
    const clientId =
      platform === 'mobile' ? process.env.VK_MODILE_ID : process.env.VK_WEB_ID;
    const clientSecret =
      platform === 'mobile'
        ? process.env.VK_MOBILE_SECRET
        : process.env.VK_WEB_SECRET;
    const redirectUri =
      platform === 'mobile'
        ? process.env.VK_MOBILE_REDIRECT
        : process.env.VK_WEB_REDIRECT;

    return this.http
      .get(
        `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`,
      )
      .toPromise();
  }

  private async getRedirectUri(client: Devices): Promise<string> {
    switch (client) {
      case DeviceType.IOS:
        return process.env.IOS_REDIRECT_URI;
      case DeviceType.ANDROID:
        return process.env.ANDROID_REDIRECT_URI;
      case DeviceType.WEB:
        return process.env.WEB_REDIRECT_URI;
      default:
        return process.env.IOS_REDIRECT_URI;
    }
  }
}
