import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

        const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!allowedRoles || allowedRoles.length === 0) { return true; }

        const request = context.switchToHttp().getRequest();
        const user = request.user as { role?: UserRole };

        if (!user || !user.role) { throw new ForbiddenException('Usuário não autenticado ou perfil ausente.');}

        const hasPermission = allowedRoles.includes(user.role);

        if (!hasPermission) { throw new ForbiddenException('Acesso negado.');}

        return true;
    }
}