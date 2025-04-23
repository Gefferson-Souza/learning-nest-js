import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

@Roles(Role.Admin, Role.User)
@UseGuards(AuthGuard, RoleGuard)
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
  async readOne(@ParamId() id: number): Promise<any> {
    return this._userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDto,
    @ParamId() id: number,
  ): Promise<any> {
    return this._userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDto,
    @ParamId() id: number,
  ): Promise<any> {
    return this._userService.updatePartial(id, body);
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number): Promise<any> {
    return this._userService.deleteUser(id);
  }
}
