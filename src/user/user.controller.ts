import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: any): Promise<any> {
    console.log('User created:', body);
    return body;
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
  async update(@Body() body, @Param() params): Promise<any> {
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
