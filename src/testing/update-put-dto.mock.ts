import { UpdatePutUserDto } from '../user/dto/update-put-user.dto';

export const UpdatePutDtoMock: UpdatePutUserDto = {
  name: 'John Doe',
  email: 'test@gmail.com',
  password: '123456',
  birthAt: new Date('1990-01-01'),
};
