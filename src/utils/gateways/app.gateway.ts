import { UserSex } from '@common/types/user.types';
import { GENDERS } from '@enums/user-sex.enum';
import { HttpStatus, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Elite } from '@persistence/app/elite/elite.entity';
import { Topic } from '@persistence/app/topic/topic.entity';
import { Helper } from '@utils/app.helper';
import { ChatQueueService } from '@utils/chat/chat.queue';
import { SocketUser } from '@utils/chat/chat.types';
import { IChatUser } from '@utils/chat/interface/chat-user.interface';
import { Server, Socket } from 'socket.io';

interface IOnlineUsers {
  id: string;
  userId: number;
  sex: UserSex;
}

@WebSocketGateway(4114, {
  transport: ['websocket'],
  cors: { origin: '*', credentials: true },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  /**
   * Онлайн пользователей
   *
   * mensOnline => количество парней онлайн
   * womensOnline => количество девушек онлайн
   * count => общий онлайн
   *
   */
  public onlineUsers: IOnlineUsers[] = [];

  public mensOnline = 0;

  public womensOnline = 0;

  public count = 0;

  protected chatQueue = new ChatQueueService();

  @WebSocketServer()
  server: Server;

  public logger: Logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log('App socket gateway initialized!');

    setInterval(async () => {
      this.server.emit('SERVER:SEND_ONLINE', {
        statusCode: HttpStatus.OK,
        online: await this.generateOnline(),
      });
    }, 50 * 1000);
  }

  /**
   *
   * Generate chat fake online
   *
   * @returns chat fake online
   *
   */
  async generateOnline() {
    const fakeOnline = await Helper.generateRandomOnline(1100, 1200);

    const defaultRoom = ChatQueueService.getDefaultQueue().length;
    const adultRoom = ChatQueueService.getAdultQueue().length;

    const all: number = this.count + fakeOnline;
    const male: number = this.mensOnline + Math.round(fakeOnline * 0.3);
    const female: number = this.womensOnline + Math.round(fakeOnline * 0.7);
    const defaultRoomOnline: number = defaultRoom + Math.round(fakeOnline / 2);
    const adultRoomOnline: number = adultRoom + Math.round(fakeOnline / 4);

    return {
      all,
      male,
      female,
      defaultRoomOnline,
      adultRoomOnline,
    };
  }

  handleConnection(client: Socket) {
    const user: IChatUser = JSON.parse(client.handshake.query.user as string);

    this.chatQueue.setCurrentUser(user);

    console.log('[QUEUE USER]: ', this.chatQueue.getCurrentUser());

    // check users sex for correctly
    if (user.sex === GENDERS.MALE) this.mensOnline += 1;
    else if (user.sex === GENDERS.FEMALE) this.womensOnline += 1;
    else console.log(`Sex: ${user.sex} not found in system`);
    // add all online
    this.count += 1;
    this.onlineUsers.push({
      id: client.id,
      userId: user.id,
      sex: user.sex as UserSex,
    });
    this.logger.log(
      `Client connected: ${client.id}\n Online: ${this.count}` +
        `\nMens: ${this.mensOnline}\nWomens: ${this.womensOnline}`,
    );
    const listenMessagesRoom = `messages/${user.id}`;
    client.data.user = user;
    client.data.connections = 0;
    client.data.listenMessages = listenMessagesRoom;
    client.join(listenMessagesRoom);
    client.emit(
      'connection',
      `Client: [${client.id}] Successfully connected to wss`,
    );

    client.emit('USER_ONLINE', {
      userId: user.id,
      online: true,
    });
  }

  handleDisconnect(client: Socket) {
    this.count -= 1;
    const user = this.onlineUsers.find((usr) => usr.id === client.id);
    const userIndex = this.onlineUsers.indexOf(user);
    this.onlineUsers.slice(userIndex, 1);
    if (user.sex === GENDERS.FEMALE) this.womensOnline -= 1;
    else if (user.sex === GENDERS.MALE) this.mensOnline -= 1;
    const dRoomUser = ChatQueueService.getDefaultQueue().find(
      (dUser: SocketUser) => dUser.user.id === client.data.user.id,
    );
    const aRoomUser = ChatQueueService.getAdultQueue().find(
      (dUser: SocketUser) => dUser.user.id === client.data.user.id,
    );
    const dIndex = ChatQueueService.getDefaultQueue().indexOf(dRoomUser);
    if (dRoomUser) {
      ChatQueueService.getDefaultQueue().slice(dIndex, 1);
    }
    if (aRoomUser) {
      const aIndex = ChatQueueService.getAdultQueue().indexOf(dRoomUser);
      ChatQueueService.getAdultQueue().slice(aIndex, 1);
    }
    this.logger.log(`Client disconnected: ${client.id}\n Online ${this.count}`);
    client.emit('USER_ONLINE', {
      userId: user.id,
      online: false,
    });
  }

  @SubscribeMessage('CLIENT:USERS_ONLINE')
  async userIsOnline(client: Socket, userId: number) {
    let result = false;
    const user = this.onlineUsers.find(
      (usr: IOnlineUsers) => usr.userId === userId,
    );
    console.log(user);
    if (user) result = true;
    this.server.to(client.id).emit('SERVER:USERS_ONLINE', result);
  }

  @SubscribeMessage('CLIENT:SEND_THEME')
  async createTheme(client: Socket, theme: Topic) {
    console.log('[THEME]: ', theme);
    return client.broadcast.emit('SERVER:NEW_THEME', theme);
  }

  @SubscribeMessage('CLIENT:SEND_ELITE')
  async createElite(client: Socket, elite: Elite) {
    console.log('[ELITE]: ', elite);
    return client.broadcast.emit('SERVER:NEW_ELITE', elite);
  }

  @SubscribeMessage('CLIENT:REMOVE_THEME')
  async removeTheme(client: Socket, themeId: number) {
    console.log('[THEME_ID]: ', themeId);
    return client.broadcast.emit('SERVER:THEME_REMOVED', themeId);
  }
}
