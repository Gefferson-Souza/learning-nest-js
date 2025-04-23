import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request: any = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException(
        'Usuário não encontrado na requisição. User o AuthGuard para proteger a rota.',
      );
    }

    if (filter) {
      return request.user[filter];
    }

    return request.user;
  },
);
