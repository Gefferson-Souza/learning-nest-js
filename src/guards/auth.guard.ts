import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _userService: UserService,
        private readonly _authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers["authorization"];
            const token = authorization?.replace("Bearer ", "").trim();

            if (!token) {
                return false;
            }

            request.headers.authorization = token;

            const payload = this._authService.checkToken(token);

            request.tokenPayload = payload;
            request.user = this._userService.findOne(Number(payload.sub));

         
            return true;
        } catch (err) {
            return false;
        }
    }
}