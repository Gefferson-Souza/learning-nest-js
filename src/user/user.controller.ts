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
import { UpdatePatchUserDto } from './dto/update-patch-user.dto copy';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateUserDto): Promise<any> {
    return this._userService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  async read(): Promise<any> {
    return this._userService.list();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async readOne(@ParamId() id: number): Promise<any> {
    return this._userService.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDto,
    @ParamId() id: number,
  ): Promise<any> {
    return this._userService.update(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDto,
    @ParamId() id: number,
  ): Promise<any> {
    return this._userService.updatePartial(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@ParamId() id: number): Promise<any> {
    return this._userService.deleteUser(id);
  }
}
