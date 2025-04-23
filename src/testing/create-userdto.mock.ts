import { CreateUserDto } from '../user/dto/create-user.dto';

export const createUserDtoMock: CreateUserDto = {
  name: 'John Doe',
  email: 'test@gmail.com',
  password: '123456',
  birthAt: new Date('1990-01-01'),
};
