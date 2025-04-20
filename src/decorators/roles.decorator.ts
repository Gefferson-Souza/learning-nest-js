import { Role } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export function Roles(...role: Role[]): ClassDecorator & MethodDecorator {
  return SetMetadata(ROLES_KEY, role);
}
