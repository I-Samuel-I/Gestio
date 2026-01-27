import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

        const allowedRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!allowedRoles || allowedRoles.length === 0) { return true; }

        const request = context.switchToHttp().getRequest();
        const user = request.user as { role: string };

        if (!user || !user.role) { throw new ForbiddenException('User not authenticated or role missing');}

        const hasPermission = allowedRoles.includes(user.role);

        if (!hasPermission) { throw new ForbiddenException('Access denied');}

        return true;
    }
}