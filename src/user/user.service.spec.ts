import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { userRepositoryMock } from '../testing/user-repository.mock';

describe('userService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock,
    ],
    }).compile();

    userService = module.get<UserService>(UserService);

    test('Validar definição do serviço', () => {
      expect(userService).toBeDefined();
    });
  });
});
