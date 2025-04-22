import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { CreateUserDto } from './dto/create-user.dto';

describe('userService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });
  test('Validar definição do serviço', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    test('Criar um novo usuário', async () => {
        const data:CreateUserDto = {
            name: 'John Doe',
            email: 'test@gmail.com',
            password: '123456',
            birthAt: new Date('1990-01-01'),
        }

        const user:User = await userService.create(data);

        expect(user).toBeDefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name', data.name);
        expect(user).toHaveProperty('email', data.email);
        expect(user).toHaveProperty('password', data.password);

    })
  });
});
