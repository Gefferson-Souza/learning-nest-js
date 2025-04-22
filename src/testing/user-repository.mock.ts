import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countBy: jest.fn(),
  },
};
