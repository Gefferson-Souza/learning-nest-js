import { UserService } from '../user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn(),
    list: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    updatePartial: jest.fn(),
    deleteUser: jest.fn(),
    exists: jest.fn(),
  },
};
