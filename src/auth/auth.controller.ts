import { Body, Controller, Post, Headers, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this._authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this._userService.create(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDto) {
    return this._authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { token, password }: AuthResetDto) {
    return this._authService.reset(token, password);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  async verify(@Headers('authorization') token: string, @Req() req: any) {
    return {
        user: req.user,
        token: token,
    }
  }
}
