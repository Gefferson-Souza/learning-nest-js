import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly issuer: string = 'login';
  private readonly audience: string = 'users';

  constructor(
    private readonly _jwtService: JwtService,
    private readonly _prismaService: any,
    private readonly _userService: UserService,
  ) {}

  async createToken(user: any) {
    return {
      token: this._jwtService.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string): any | BadRequestException {
    try {
      const validToken = this._jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return validToken;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  isValidToken(token: string): boolean {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user: Partial<any> | null = await this._prismaService.user.findFirst(
      {
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
        },
      },
    );

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    const compared = await bcrypt.compare(password, user?.password || '');

    if (!compared) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string): Promise<boolean> {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    //TO DO: Enviar email com token de recuperação...

    return true;
  }

  async reset(token: string, password: string) {
    //TO DO: Validar token...

    //TO DO: Extrair id do token...
    const id = 0;

    const user: any = await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this._userService.create(data);

    return this.createToken(user);
  }
}
