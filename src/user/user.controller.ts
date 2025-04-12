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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto copy';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}


  @Post()
  async create(@Body() data: CreateUserDto): Promise<any> {
    return this._userService.create(data);
  }

  @Get()
  async read(): Promise<any> {
    return this._userService.list();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this._userService.update(id,data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this._userService.updatePartial(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._userService.deleteUser(id);
  }
}
