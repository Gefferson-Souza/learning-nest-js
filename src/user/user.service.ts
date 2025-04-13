import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto copy';
import { IsDateString } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    return this._prismaService.user.create({ data });
  }

  async list(): Promise<any[]> {
    return this._prismaService.user.findMany();
  }

  async findOne(id: number): Promise<any> {
    await this.exists(id);

    return this._prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.exists(id);

    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;

    return this._prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    await this.exists(id);

    if (data.birthAt) {
      data.birthAt = new Date(data.birthAt);
    }

    return this._prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number) {
    await this.exists(id);

    return this._prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<boolean> {
    const user = await this._prismaService.user.count({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return !!user;
  }
}
