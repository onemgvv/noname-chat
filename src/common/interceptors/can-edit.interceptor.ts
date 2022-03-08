import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@persistence/app/user/user.entity';
import { RolesList } from '@enums/roles.enum';

@Injectable()
export class CanEditInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const currentUser: User = await request.user;
    if (!currentUser.lastUpdate) return next.handle();

    const today: number = Date.now();
    const lastUpdate: Date = new Date(currentUser.lastUpdate);
    const monthInMs: number = 30 * 24 * 60 * 60 * 1000;

    if (
      currentUser.roles.some(
        (role) =>
          role.name === RolesList.PREMIUM ||
          role.name === RolesList.ADMIN ||
          role.name === RolesList.MODERATOR,
      )
    ) {
      return next.handle();
    }

    if (today - monthInMs < lastUpdate.getTime()) {
      throw new ForbiddenException(
        'Вы превысилы лимит редактирования аккаунта в этом месяце! ' +
          'Для снятия лимита оформите Premium',
      );
    }

    return next.handle();
  }
}
