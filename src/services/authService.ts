import { RepositoryResponse } from '../dto/repositoryResponse';
import {
  ChangePasswordDto,
  CreateUserResult,
  LoginDto,
  TokenPayload,
  UserCreateDto,
} from '../dto/userCreateDto';
import authRepository from '../repositories/authRepository';

class AuthService {
  async register(
    user: UserCreateDto,
    url: string,
  ): Promise<RepositoryResponse<CreateUserResult>> {
    return await authRepository.register(user, url);
  }

  async login(user: LoginDto): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.login(user);
  }

  async changePassword(
    user: ChangePasswordDto,
  ): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.changePassword(user);
  }

  async verifyEmail(token: string): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.verifyEmail(token);
  }
}

export default new AuthService();
