import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create({ name, email, password }: CreateUserDto) {
    const user = await this._prismaService.user.create({
        data: {
            name,
            email,
            password,
        },
    })
    return user;
  }
}
