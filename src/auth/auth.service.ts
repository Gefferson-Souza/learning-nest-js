import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _prismaService: PrismaService,
  ) {}

  async createToken(user: User) {
    return this._jwtService.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: user.id.toString(),
        issuer: 'login',
        audience: 'users',
      },
    );
  }

  async checkToken() {
    return true;
  }

  async login(email: string, password: string) {
    const user = await this._prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return user;
  }

  async forget(email: string) {
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

    await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
