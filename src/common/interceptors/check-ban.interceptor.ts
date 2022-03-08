import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@persistence/app/user/user.entity';

@Injectable()
export class CheckBanInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const user: User = await request.user;
    if (!user || !user.ban) return next.handle();

    const today: number = Date.now();
    const ban = user.ban.getTime();

    if (today < ban)
      throw new ForbiddenException({ ban: true }, 'Вы забанены!');

    user.ban = null;
    user.save();

    return next.handle();
  }
}
