export interface SocialData {
  sub: string;
  email: string;
  sex?: 'male' | 'female' | 'default';
  age?: number;
  name?: string;
  city?: string;
}
