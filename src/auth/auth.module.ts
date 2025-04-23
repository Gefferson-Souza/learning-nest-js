import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: '87S89TY3HWUIT29HQINAOKCMJIQNQQ;1123/1231H31U3HY781Y31UI1U19231',
    }),
    forwardRef(() => UserModule),
    FileModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
