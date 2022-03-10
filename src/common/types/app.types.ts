import { Presets } from '@enums/presets.enum';

export type SocialIds = 'appleId' | 'vkId' | 'googleId';
export type Devices = 'ios' | 'android' | 'web';

export type Folder =
  | Presets.PREMIUM_MEMOJI
  | Presets.DEFAULT_MEMOJI
  | Presets.ALL_IMAGES
  | Presets.STORIES
  | Presets.BOT_IMAGES;
