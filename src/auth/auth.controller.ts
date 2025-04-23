import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { User } from '../decorators/user.decorator';
import { FileService } from '../file/file.service';
import { AuthGuard } from '../guards/auth.guard';

// Tipagens
interface TokenResponse {
  token: string;
}

interface VerifyResponse {
  user: number;
  token: string;
}

interface FileUploadResponse {
  success: boolean;
  message: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _fileService: FileService,
  ) {}

  @Post('login')
  async login(
    @Body() { email, password }: AuthLoginDto,
  ): Promise<TokenResponse> {
    return this._authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto): Promise<TokenResponse> {
    return this._authService.register(body);
  }

  @Post('forget')
  async forget(
    @Body() { email }: AuthForgetDto,
  ): Promise<{ success: boolean }> {
    const success = await this._authService.forget(email);
    return { success };
  }

  @Post('reset')
  async reset(
    @Body() { token, password }: AuthResetDto,
  ): Promise<TokenResponse> {
    return this._authService.reset(token, password);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verify(
    @Headers('authorization') token: string,
    @User('id') user: number,
  ): VerifyResponse {
    return {
      user,
      token,
    };
  }

  @UseInterceptors(FilesInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @Headers('authorization') token: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<FileUploadResponse> {
    try {
      const filesPromieses: Promise<string>[] = files.map(
        (file: Express.Multer.File) => {
          const storagePath = join(
            __dirname,
            '..',
            '..',
            'storage',
            'photo',
            file.originalname,
          );
          return this._fileService.uploadFile(file, storagePath);
        },
      );
      await Promise.all(filesPromieses);

      return { success: true, message: 'Files uploaded successfully!' };
    } catch (err) {
      throw new BadRequestException(`Error uploading file: ${err.message}`);
    }
  }
}
