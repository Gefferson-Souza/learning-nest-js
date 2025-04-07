import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto copy';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { name, email, password }: CreateUserDto): Promise<any> {
    return { name, email, password };
  }

  @Get()
  async read(): Promise<any> {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) params:number): Promise<any> {
    return {
      user: {},
      params,
    };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdatePutUserDto,
    @Param('id', ParseIntPipe) params:number,
  ): Promise<any> {
    return {
      user: {},
      params,
      name,
      email,
      password,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body:UpdatePatchUserDto, @Param('id', ParseIntPipe) params:number): Promise<any> {
    return {
      user: {},
      params,
      body,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) params:number): Promise<any> {
    return {
      user: {},
      params,
    };
  }
}
