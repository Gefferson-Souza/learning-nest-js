import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { CreateUserDto } from './dto/create-user.dto';

import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDtoMock } from '../testing/create-userdto.mock';
import { Repository } from 'typeorm';
import { UpdatePutDtoMock } from '../testing/update-put-dto.mock';
import { updatePatchDtoMock } from '../testing/update-patch-dto.mock';

describe('userService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });
  test('Validar definição do serviço', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    test('Method Create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const data: CreateUserDto = createUserDtoMock;
      const user: User = await userService.create(data);

      expect(user).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('Method List', async () => {
      const users: User[] = await userService.list();

      expect(users).toEqual(userEntityList);
    });

    test('method FindOne', async () => {
      const user: User = await userService.findOne(1);

      expect(user).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('Method Update', async () => {
      const result = await userService.update(1, UpdatePutDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });
    test('Method UpdatePartial', async () => {
      const result = await userService.updatePartial(1, updatePatchDtoMock);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('Method Delete', async () => {
      const result = await userService.deleteUser(1);
      expect(result).toEqual(true);
    });
  });
});
