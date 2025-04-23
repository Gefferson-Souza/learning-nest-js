import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityList[0]),
    find: jest.fn().mockResolvedValue(userEntityList),
    findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn().mockResolvedValue(userEntityList[0]),
    delete: jest.fn(),
    countBy: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
