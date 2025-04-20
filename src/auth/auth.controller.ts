import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
import path, { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this._authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this._userService.create(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDto) {
    return this._authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { token, password }: AuthResetDto) {
    return this._authService.reset(token, password);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  async verify(@Headers('authorization') token: string, @User('id') user: any) {
    return {
      user,
      token,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@Headers('authorization') token: string, @UploadedFile() photo: Express.Multer.File) {
    const path = join(__dirname, '..', '..', 'storage', 'photo', photo.originalname);

    try {
      const storagePath = join(__dirname, '..', '..', 'storage', 'photos');
      const filePath = await this._fileService.uploadFile(photo, '');
      return { success: true, message: 'File uploaded successfully!', path: filePath };
  } catch (err) {
      throw new NotFoundException(`Error uploading file: ${err.message}`);
  }
  }
}
