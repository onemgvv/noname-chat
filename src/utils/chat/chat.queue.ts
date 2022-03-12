import { Injectable } from '@nestjs/common';
import { User } from '@persistence/app/user/user.entity';
import { correctAge, correctCity, currectSex } from './chat.filter';
import { SocketUser } from './chat.types';
import { IChatUser } from './interface/chat-user.interface';

@Injectable()
export class ChatQueueService {
  private currentUser: IChatUser;

  private static defaultRoomQueue: SocketUser[] = new Array<SocketUser>();

  private static adultRoomQueue: SocketUser[] = new Array<SocketUser>();

  public setCurrentUser(_currentUser: IChatUser): void {
    this.currentUser = _currentUser;
  }

  public getCurrentUser(): IChatUser {
    return this.currentUser;
  }

  public static pushInDefaultQueue(user: SocketUser) {
    console.log('BEFORE PUSH DEFAULT: ', this.getDefaultQueue());
    this.defaultRoomQueue.push(user);
    console.log('AFTER PUSH DEFAULT: ', this.getDefaultQueue());
  }

  public static pushInAdultQueue(user: SocketUser) {
    console.log('BEFORE PUSH ADULT: ', this.getAdultQueue());
    this.adultRoomQueue.push(user);
    console.log('AFTER PUSH ADULT: ', this.getAdultQueue());
  }

  public static async findWithFilterFromDefault(
    currentUser: User | IChatUser,
  ): Promise<SocketUser> {
    return this.defaultRoomQueue.filter((el: SocketUser) => {
      const corrAge = correctAge(currentUser, el.user);
      const corrCity = correctCity(currentUser, el.user);
      const corrSex = currectSex(currentUser, el.user);
      if (currentUser.id !== el.user.id && corrAge && corrCity && corrSex) {
        return el;
      }
    })[0];
  }

  public static async findWithFilterFromAdult(
    currentUser: User | IChatUser,
  ): Promise<SocketUser> {
    return this.defaultRoomQueue.filter((el: SocketUser) => {
      const corrAge = correctAge(currentUser, el.user);
      const corrCity = correctCity(currentUser, el.user);
      const corrSex = currectSex(currentUser, el.user);
      if (currentUser.id !== el.user.id && corrAge && corrCity && corrSex) {
        return el;
      }
    })[0];
  }

  public static async findFromDefaultQueue(
    currentUser: User | IChatUser,
  ): Promise<SocketUser> {
    console.log('default users room in search: ', this.defaultRoomQueue);
    const user = await this.defaultRoomQueue.find((sUser: SocketUser) => {
      console.log('sUser: ', sUser);
      if (sUser.user.id !== currentUser.id) {
        return sUser;
      }
    });
    console.log('found user: ', user);
    return user;
  }

  public static async findFromAdultQueue(
    currentUser: User | IChatUser,
  ): Promise<SocketUser> {
    return this.adultRoomQueue.find(
      (sUser: SocketUser) => sUser.user.id !== currentUser.id,
    );
  }

  public static removeFromDefaultQueue(user: User | IChatUser): void {
    this.defaultRoomQueue = this.defaultRoomQueue.filter(
      (el: SocketUser) => el.user.id !== user.id,
    );
  }

  public static removeFromAdultQueue(user: User | IChatUser): void {
    this.adultRoomQueue = this.adultRoomQueue.filter(
      (el: SocketUser) => el.user.id !== user.id,
    );
  }

  public static getDefaultQueue(): SocketUser[] {
    return this.defaultRoomQueue;
  }

  public static getAdultQueue(): SocketUser[] {
    return this.defaultRoomQueue;
  }
}
