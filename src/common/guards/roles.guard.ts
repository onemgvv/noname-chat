import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.get<string[]>(
        ROLES_KEY,
        context.getHandler(),
      );
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();

      const hasRole = () =>
        user.roles.some((role) => requiredRoles.includes(role.name));

      return user && user.roles && hasRole();
    } catch (error) {
      throw new ForbiddenException('Access denied');
    }
  }
}
