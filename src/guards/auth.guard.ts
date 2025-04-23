import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
      const token = authorization?.replace('Bearer ', '').trim();

      if (!token) {
        return false;
      }

      request.headers.authorization = token;

      const payload = this._authService.checkToken(token);

      request.tokenPayload = payload;
      request.user = await this._userService.findOne(Number(payload.sub));

      return true;
    } catch (err) {
      return false;
    }
  }
}
