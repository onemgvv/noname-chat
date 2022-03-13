import { User } from '@persistence/app/user/user.entity';
import { IFindDialog } from '@persistence/chat/dialog/interface/find.interface';
import { Message } from '@persistence/chat/message/message.entity';
import { generate } from 'generate-password';
import { MESSAGE_REPO, USER_REPO } from '@config/constants';
import { IUserRepository } from '@domain/app/user/interface/user-repo.interface';
import { IMessageRepository } from '@domain/chat/message/interface/message-repo.interface';
import { Inject } from '@nestjs/common';

const UserRepo = () => Inject(USER_REPO);
const MessageRepo = () => Inject(MESSAGE_REPO);

interface AgeGroups {
  title: string;
  count: number;
}

export class Helper {
  @UserRepo()
  private static userRepository: IUserRepository;

  @MessageRepo()
  private static messageRepository: IMessageRepository;

  /**
   *
   * Calculate date
   *
   * @param period hours
   * @returns date Date
   *
   */
  static calculateDate(period: number) {
    const today = new Date();
    return new Date(today.getTime() + 24 * 2.5 * period * 60 * 1000);
  }

  /**
   *
   * Generate password
   *
   * @param number length
   * @param boolean hasNum
   * @returns Promise<string> password
   *
   */
  static generatePassword(length: number, hasNum: boolean): string {
    return generate({ length: length, numbers: hasNum });
  }

  /**
   *
   * Generate refresh code
   *
   * @returns number code
   *
   */
  static generateRefreshCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  /**
   *
   * Generate expires Time
   *
   * @param days number
   * @returns Date
   *
   */
  static getExpiresTime(days: number): Date {
    const today = new Date();
    return new Date(today.getTime() + 24 * 60 * 60 * 1000 * days);
  }

  /**
   *  Generate random name
   *
   * @returns name string
   *
   */
  static generateRandomName(): string {
    return '';
  }

  /**
   *
   * Generate random Online
   *
   */
  static generateRandomOnline(max: number, min: number): number {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static getRandomBotAvatar(): string {
    const photo = [
      'premium_memojies/Frame17.png',
      'premium_memojies/Frame14.png',
      'premium_memojies/Frame10.png',
      'default_memojies/Frame11.png',
      'default_memojies/Frame8.png',
    ];

    const index = Math.floor(Math.random() * photo.length);
    return photo[index];
  }

  static async getDialogDeps(
    authorId: number,
    targetId: number,
    dialogId: number,
  ): Promise<IFindDialog> {
    const author: User = await this.userRepository.getAttributes(
      ['id', 'name', 'photo', 'email'],
      authorId,
    );

    const target: User = await this.userRepository.getAttributes(
      ['id', 'name', 'photo', 'email'],
      targetId,
    );

    const lastMessage: Message = await this.messageRepository.getLastMessage(
      dialogId,
    );

    return { id: dialogId, author, target, lastMessage };
  }

  static async sortByAgesGroups(users: User[]): Promise<AgeGroups[]> {
    const data: AgeGroups[] = [
      { title: '16-18', count: 0 },
      { title: '19-24', count: 0 },
      { title: '25-29', count: 0 },
      { title: '30+', count: 0 },
    ];

    await users.map((user: User) => {
      if (user.age <= 18 && user.age >= 16) data[0].count += 1;
      else if (user.age <= 24 && user.age >= 19) data[1].count += 1;
      else if (user.age <= 29 && user.age >= 25) data[2].count += 1;
      else if (user.age >= 30) data[3].count += 1;
    });

    return data;
  }
}
