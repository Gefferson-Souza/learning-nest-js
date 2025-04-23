import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    data.password = await this.encriptedPassword(data.password);

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async list(): Promise<any[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    await this.exists(id);

    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.exists(id);

    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;

    if (data.password) {
      data.password = await this.encriptedPassword(data.password);
    }

    await this.userRepository.update(id, {
      ...data,
    });

    return this.userRepository.findOneBy({ id });
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    await this.exists(id);

    if (data.birthAt) {
      data.birthAt = new Date(data.birthAt);
    }

    if (data.password) {
      data.password = await this.encriptedPassword(data.password);
    }

    await this.userRepository.update(id, {
      ...data,
    });

    return this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number) {
    await this.exists(id);

    await this.userRepository.delete(id);

    return true;
  }

  async exists(id: number): Promise<boolean> {
    const user = await this.userRepository.countBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return !!user;
  }

  async encriptedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
