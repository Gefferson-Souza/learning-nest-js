import { Role } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export function Roles(...role: Role[]): MethodDecorator {
  return SetMetadata(ROLES_KEY, role);
}
