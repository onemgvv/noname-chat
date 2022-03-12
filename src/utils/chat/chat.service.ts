import { DialogData, SocketUser, TypingData } from './chat.types';
import { User } from '@persistence/app/user/user.entity';
import { Socket, Server } from 'socket.io';
import { IFilestoreService } from '@utils/filestore/interface/filestore.interface';
import { IBotService } from '@domain/admin/bot/interface/bot-service.interface';
import { IDialogService } from '@domain/chat/dialog/interface/dialog-service.interface';
import { IMessageService } from '@domain/chat/message/interface/message-service.interface';
import {
  BOT_SERVICE,
  DIALOG_SERVICE,
  FILESTORE_SERVICE,
  MESSAGE_SERVICE,
} from '@config/constants';
import { SubscribeMessage } from '@nestjs/websockets';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { AppGateway } from '../gateways/app.gateway';
import { Typing } from '@enums/typing.enum';
import { IChatUser } from './interface/chat-user.interface';
import { IJoinRoom } from './interface/join-room.interface';
import { RoomType } from '@enums/room-type.interface';
import { ChatQueueService } from './chat.queue';
import { FindDialogDto } from '@api/chat/dialog/dto/find.dto';
import { Bot } from '@persistence/admin/bot/bot.entity';
import { IDisconnect } from './interface/disconnect.interface';
import { Choise } from '@enums/choise.enum';
import { CreateMessageDto } from '@api/chat/message/dto/create.dto';
import { Message } from '@persistence/chat/message/message.entity';

const MessageService = () => Inject(MESSAGE_SERVICE);
const DialogService = () => Inject(DIALOG_SERVICE);
const BotService = () => Inject(BOT_SERVICE);
const FilestoreService = () => Inject(FILESTORE_SERVICE);

@Injectable()
export class ChatService {
  private botConnectionSteps: number[] = [1, 3, 5, 10];

  private logger: Logger = new Logger('ChatService');

  private server: Server;

  constructor(
    @FilestoreService() private filestoreService: IFilestoreService,
    @MessageService() private messageService: IMessageService,
    @DialogService() private dialogService: IDialogService,
    @BotService() private botService: IBotService,
    private chatQueue: ChatQueueService,
    private appGateway: AppGateway,
  ) {
    this.server = appGateway.server;
  }

  /**
   *
   * ? Send current online to client
   *
   * @returns boolean
   *
   */
  @SubscribeMessage('CLIENT:GET_ONLINE')
  async getCurrentOnline() {
    const online = await this.appGateway.generateOnline();

    return this.server.emit('SERVER:SEND_ONLINE', {
      statusCode: HttpStatus.OK,
      online,
    });
  }

  @SubscribeMessage('CLIENT:UPDATE_USER')
  async updateUser(client: Socket, user: User) {
    if (user) client.data.user = user;

    console.log('[CLIENT CHANGE USER]', client.data.user);

    this.server.to(client.id).emit('SERVER:USER_UPDATED', {
      statusCode: HttpStatus.OK,
    });
  }

  @SubscribeMessage('CLIENT:TYPING')
  async typing(client: Socket, data: TypingData) {
    switch (data.type) {
      case Typing.DIALOG:
        return this.server
          .to(`dialog/${data.socketRoom}`)
          .emit('SERVER:TYPING', { typing: true, typingId: data.typingId });
      case Typing.ROOM:
        return this.server
          .to(data.socketRoom)
          .emit('SERVER:TYPING', { typing: true, typingId: data.typingId });
      default:
        this.logger.error(`Type: ${data.type} not found in system`);
    }
  }

  @SubscribeMessage('CLIENT:STOP_TYPING')
  async stopTyping(client: Socket, data: TypingData) {
    switch (data.type) {
      case Typing.DIALOG:
        return this.server
          .to(`dialog/${data.socketRoom}`)
          .emit('SERVER:STOP_TYPING', {
            typing: false,
            typingId: data.typingId,
          });
      case Typing.ROOM:
        return this.server.to(data.socketRoom).emit('SERVER:STOP_TYPING', {
          typing: false,
          typingId: data.typingId,
        });
      default:
        this.logger.error(`Type: ${data.type} not found in system`);
    }
  }

  /**
   *
   * ? Поиск комнаты
   *
   * @param client Socket
   * @param data JoinRoomDto
   *
   */
  @SubscribeMessage('CLIENT:JOIN_ROOM')
  async joinRoom(
    client: Socket,
    data: IJoinRoom,
  ): Promise<boolean | void | number> {
    this.logger.log('RECONNECTED');
    let partner;
    const currentUser: IChatUser = client.data.user;
    const today = new Date();

    const userCreatedAt = new Date(currentUser.createdAt);

    /**
     * Подключение бота
     */
    if (
      (currentUser.premium === 'never' || !currentUser.premium) &&
      client.data.connections === 0 &&
      userCreatedAt.getDay() === today.getDay()
    ) {
      client.data.connections += 1;

      console.log(`[USER ${currentUser.name} connected to bot]`);
      return this.connectUserToBot(client);
    }

    client.data.connections += 1;

    /**
     * Поиск собеседника
     */

    const socketUser: SocketUser = {
      roomId: client.id,
      user: currentUser,
    };

    if (socketUser.user.filter) {
      partner = await this.findChatPartnerWithSearch(data.roomType, socketUser);
    }

    partner = await this.findChatPartner(data.roomType, socketUser);

    if (!partner) {
      console.log('[NOT PARTNER]: ', partner);
      console.log('connect to bot');
      return;
    }

    client.join(partner.roomId);
    this.createDialog(
      socketUser.user as User,
      partner.user as User,
      partner.roomId,
    );
  }

  async findChatPartner(roomType: RoomType, user: SocketUser) {
    const currentUser = this.chatQueue.getCurrentUser();
    let partner: SocketUser;

    if (roomType === RoomType.DEFAULT) {
      await ChatQueueService.pushInDefaultQueue(user);
      partner = await ChatQueueService.findFromDefaultQueue(currentUser);
    }

    if (roomType === RoomType.ADULT) {
      await ChatQueueService.pushInAdultQueue(user);
      partner = await ChatQueueService.findFromAdultQueue(currentUser);
    }

    return partner;
  }

  async findChatPartnerWithSearch(roomType: RoomType, user: SocketUser) {}

  /**
   *
   * Create dialog
   *
   * @param author User
   * @param target User
   * @param roomId string
   * @returns boolean
   */
  async createDialog(author: User, target: User, roomId: string) {
    console.log('[AUTHOR]: \n', author);
    console.log('[TARGET]: \n', target);
    console.log('[ROOMID]: \n', roomId);

    const dialog: FindDialogDto | boolean =
      await this.dialogService.findByUsers(author.id, target.id);

    if (dialog)
      return this.server.to(roomId).emit('SERVER:DIALOG_CREATED', {
        statusCode: HttpStatus.OK,
        dialog,
        roomId,
      });

    const newDialog: FindDialogDto = await this.dialogService.create({
      authorId: author.id,
      targetId: target.id,
      lastMessage: null,
    });

    return this.server.to(roomId).emit('SERVER:DIALOG_CREATED', {
      statusCode: HttpStatus.OK,
      dialog: {
        id: newDialog.id,
        author,
        target,
        lastMessage: newDialog.lastMessage,
      },
      roomId,
    });
  }

  /**
   *
   * Connect user to bot
   *
   * @param client
   * @param data
   * @returns
   */
  async connectUserToBot(client: Socket) {
    const bots: Bot[] = await this.botService.getActive();
    if (!bots) return;

    const botIndex: number =
      bots.length > 1 ? Math.floor(0 + Math.random() * bots.length) : 0;
    const bot: Bot = bots[botIndex];

    this.server.to(client.id).emit('SERVER:DIALOG_CREATED', {
      statusCode: HttpStatus.OK,
      dialog: {
        id: bot.id,
        author: client.data.user,
        target: bot,
        lastMessage: null,
      },
      message: bot.messages,
    });
  }

  async connectNewUserToBot(client: Socket, user: User) {
    // if (client.data.connections === this.botConnectionSteps[0]) { }
  }

  @SubscribeMessage('CLIENT:STOP_SEARCH')
  async stopSearch(client: Socket) {
    const currentUser: User = client.data.user;

    await ChatQueueService.removeFromDefaultQueue(currentUser);
    await ChatQueueService.removeFromAdultQueue(currentUser);

    return this.server
      .to(`messages/${currentUser.id}`)
      .emit('SERVER:SEARCH_STOPED', {
        statusCode: HttpStatus.OK,
      });
  }

  @SubscribeMessage('CLIENT:SHOW_DISCONNECT_ALERT')
  disconnectAlert(client: Socket, partner: User) {
    const currentUser: User = client.data.user;
    const partnerMsgRoom = `messages/${partner.id}`;

    this.server.to(partnerMsgRoom).emit('SERVER:ALERT_SHOWN', {
      statusCode: HttpStatus.OK,
      author: currentUser,
      partner,
    });
  }

  /**
   *
   * Disconnect from room
   *
   * @param client Socket
   * @param data DisconnectDto
   * @returns void | Promise<boolean | void>
   */
  @SubscribeMessage('CLIENT:DISCONNECT_ROOM')
  disconnectRoom(
    client: Socket,
    data: IDisconnect,
  ): void | Promise<boolean | void> {
    const currentUser: User = client.data.user;

    return this.disconnectFromRoom(
      currentUser,
      data.socketRoom,
      data.dialogId,
      data.choise,
    );
  }

  /**
   *
   * Disconnect from room
   *
   * @param socketRoom string
   * @param dialogId string
   * @param choise string (save or delete)
   * @returns void | Promise<boolean | void>
   *
   */
  disconnectFromRoom(
    currentUser: User,
    socketRoom: string,
    dialogId: number,
    choise: string,
  ): void | Promise<boolean | void> {
    switch (choise) {
      case Choise.SAVE:
        this.server.to(socketRoom).emit('SERVER:SAVE_DIALOG', {
          statusCode: HttpStatus.OK,
          message: 'Диалог успешно сохранен!',
        });
        return this.server.socketsLeave(socketRoom);
      case Choise.DELETE:
        return this.deleteRoom(currentUser, socketRoom, dialogId);
      default:
        this.logger.error(`Choise: ${choise} not found in system`);
    }
  }

  /**
   *
   * Delete room
   *
   * @param socketRoom string
   * @param dialogId string
   * @returns Promise <boolean | void>
   */
  async deleteRoom(
    currentUser: User,
    socketRoom: string,
    dialogId: number,
  ): Promise<boolean | void> {
    await this.dialogService.deleteOne(dialogId);

    this.server.to(socketRoom).emit('SERVER:DELETE_ROOM', {
      statusCode: 200,
      userId: currentUser.id,
      message: 'Диалог успешно удален!',
    });
    return this.server.socketsLeave(socketRoom);
  }

  /**
   *
   * connect to dialog
   *
   * @param client string
   * @param dialogId string
   * @returns Promise<boolean>
   */
  @SubscribeMessage('CLIENT:CONNECT_TO_DIALOG')
  async connectToDialog(client: Socket, dialogId: string): Promise<boolean> {
    const dialogRoomId = `dialog/${dialogId}`;
    client.join(dialogRoomId);
    return this.server.to(dialogRoomId).emit('SERVER:CONNECTED_TO_DIALOG', {
      statusCode: HttpStatus.OK,
    });
  }

  /**
   *
   * Delete Dialog
   *
   * @param client Socket
   * @param data DialogData
   * @returns Promise<boolean>
   */
  @SubscribeMessage('CLIENT:DELETE_DIALOG')
  async deleteDialog(client: Socket, data: DialogData): Promise<boolean> {
    const partnerMsgRoom = `messages/${data.partner.id}`;
    await this.dialogService.deleteOne(data.dialogId);

    return this.server.to(partnerMsgRoom).emit('SERVER:DIALOG_DELETE', {
      statusCode: HttpStatus.OK,
      message: 'Диалог успешно удален!',
      dialogId: data.dialogId,
    });
  }

  /**
   *
   * Clear messages in dialog
   *
   * @param client Socket
   * @param data DialogData
   * @returns Promise<boolean>
   *
   */
  @SubscribeMessage('CLIENT:CLEAR_DIALOG_MESSAGES')
  async clearDialogMessages(
    client: Socket,
    data: DialogData,
  ): Promise<boolean> {
    const partnerMsgRoom = `messages/${data.partner.id}`;

    await this.messageService.deleteByDialogId(data.dialogId);

    return this.server.to(partnerMsgRoom).emit('SERVER:CLEAR_DIALOG_MESSAGES', {
      statusCode: HttpStatus.OK,
      message: 'Сообщения успешно удалены',
    });
  }

  @SubscribeMessage('CLIENT:CREATE_MESSAGE')
  async createMessage(
    client: Socket,
    data: DialogData,
  ): Promise<boolean | void> {
    let image: any;
    let voice: any;
    const currentUser: User = client.data.user;
    const partnerMsgRoom = `messages/${data.partner.id}`;

    if (data.photo) {
      const clearPhoto = data.photo.replace('data:image/png;base64,', '');
      image = await this.filestoreService.uploadDataFromSocket(
        'all_images',
        clearPhoto,
        'png',
      );
    }

    if (data.voice) {
      const clearVoice = data.voice.replace(
        'data:audio/webm;codecs=opus;base64,',
        '',
      );
      voice = await this.filestoreService.uploadDataFromSocket(
        'voices',
        clearVoice,
        'webm',
      );
    }

    const msgData: CreateMessageDto = {
      authorId: currentUser.id,
      targetId: data.partner.id,
      text: data.message,
      dialogId: data.dialogId,
      image: image ? image?.path : null,
      voice: voice ? voice?.path : null,
    };

    this.server.to(partnerMsgRoom).emit('SERVER:NEW_MESSAGE', {
      statusCode: HttpStatus.OK,
      message: msgData,
    });

    const message = await this.messageService.create(msgData);
    await this.dialogService.setLastMessage(data.dialogId, message.id);
    return !message ? false : true;
  }

  /**
   *
   * ? mark messages as read
   *
   * @param dialogId string
   * @returns boolean
   */
  @SubscribeMessage('CLIENT:MARK_AS_READ')
  async markAsRead(client: Socket, dialogId: number): Promise<Message[]> {
    const dialogRoomId = `dialog/${dialogId}`;
    await this.server
      .to(dialogRoomId)
      .emit('SERVER:MESSAGE_MARKED', { statusCode: 200 });

    return this.messageService.markAsRead(dialogId);
  }
}
