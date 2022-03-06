import { AppleLoginDto } from '@api/auth/dto/apple-login.dto';
import { Platform } from '@auth/services/social-auth.service';
import { AppleIdTokenType } from 'apple-signin-auth';
import { TokenPayload } from 'google-auth-library';
import { VkTokenPayload } from './vk-payload.interface';

export interface ISocialAuthService {
  receiveGoogleUser(token: string): Promise<TokenPayload>;
  receiveAppleUser(appleLoginData: AppleLoginDto): Promise<AppleIdTokenType>;
  receiveVkUser(code: string, platform: Platform): Promise<VkTokenPayload>;
}
