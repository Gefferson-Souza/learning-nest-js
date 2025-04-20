import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly _reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext) {
        try {
            const requiredRoles:Role[] = this._reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

            console.log(requiredRoles)

            return true;
        } catch (err) {
            return false;
        }
    }
}