import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { userRepositoryMock } from "../testing/user-repository.mock";
import { Repository } from "typeorm";
import { User } from "../user/entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { userEntityList } from "../testing/user-entity-list.mock";

describe('authService', () => {
    let authService: AuthService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                jwtServiceMock,
                userServiceMock,
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    test('Validar definição do serviço', () => {
        expect(authService).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    describe('Token', () => {
        test('Create Token Method', async () => {
            const result = await authService.createToken(userEntityList[0]);
            
            expect(result).toEqual({
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2VmZmVyc29uIiwiZW1haWwiOiJnZWZmZXJzb25AZ21haWwuY29tIiwiaWF0IjoxNzQ1NDExMTk4LCJleHAiOjE3NDYwMTU5OTgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.44P5h2I6oaRw_Tbf02BemsieGI5LMMbkMN7DQfcPmsM"
            })
        })
    })
    describe('Authentication', () => {})
    describe('Token', () => {})
})