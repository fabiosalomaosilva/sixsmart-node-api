import { RepositoryResponse } from '../dto/repositoryResponse';
import {
  ChangePasswordDto,
  CreateUserResult,
  ForgotPasswordDto,
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

  async existsUser(email: string): Promise<boolean> {
    return await authRepository.existsUser(email);
  }

  async changePassword(
    user: ChangePasswordDto,
  ): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.changePassword(user);
  }

  async verifyEmail(token: string): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.verifyEmail(token);
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return await authRepository.forgotPassword(forgotPasswordDto);
  }

  async sendCode(
    email: string,
    url: string,
  ): Promise<RepositoryResponse<TokenPayload>> {
    return await authRepository.sendCodeAsync(email, url);
  }
}

export default new AuthService();
