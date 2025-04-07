import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() {name, email, password}: CreateUserDto): Promise<any> {
    return {name, email, password};
  }

  @Get()
  async read(): Promise<any> {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param() params): Promise<any> {
    return {
      user: {},
      params,
    };
  }

  @Put(':id')
  async update(@Body() body:CreateUserDto, @Param() params): Promise<any> {
    return {
      user: {},
      params,
      body,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() params): Promise<any> {
    return {
      user: {},
      params,
      body,
    };
  }

  @Delete(':id')
  async deleteUser(@Param() params): Promise<any> {
    return {
      user: {},
      params,
    };
  }
}
