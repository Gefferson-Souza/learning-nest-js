import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(
      {
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2VmZmVyc29uIiwiZW1haWwiOiJnZWZmZXJzb25AZ21haWwuY29tIiwiaWF0IjoxNzQ1NDExMTk4LCJleHAiOjE3NDYwMTU5OTgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.44P5h2I6oaRw_Tbf02BemsieGI5LMMbkMN7DQfcPmsM"
      }
    ),
    verify: jest.fn().mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2VmZmVyc29uIiwiZW1haWwiOiJnZWZmZXJzb25AZ21haWwuY29tIiwiaWF0IjoxNzQ1NDExMTk4LCJleHAiOjE3NDYwMTU5OTgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.44P5h2I6oaRw_Tbf02BemsieGI5LMMbkMN7DQfcPmsM"),
  },
};
