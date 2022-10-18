import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UserModel } from '../data/userSchema';
import { RepositoryResponse } from '../dto/repositoryResponse';
import {
  LoginDto,
  UserCreateDto,
  CreateUserResult,
  TokenPayload,
  ChangePasswordDto,
} from '../dto/userCreateDto';
import { User } from '../models/user';
import emailService from '../services/emailService';

class AuthRepository {
  async register(
    user: UserCreateDto,
    url: string,
  ): Promise<RepositoryResponse<CreateUserResult>> {
    if (user.password.length < 6) {
      const res: RepositoryResponse<CreateUserResult> = {
        error: 'Senha não atende os requisitos exigidos.',
        status: 'error',
      };
      return res;
    }
    //user.password = await bcrypt.hash(user.password, 10);
    user.confirmPassword = await bcrypt.hash(user.confirmPassword, 10);

    const isEqual = bcrypt.compareSync(user.password, user.confirmPassword);
    if (!isEqual) {
      const res: RepositoryResponse<CreateUserResult> = {
        error: 'Senha e confirmação de senha são diferentes.',
        status: 'error',
      };
      return res;
    }
    try {
      const oldUser = await UserModel.findOne<User>({ email: user.email });

      if (oldUser) {
        const res: RepositoryResponse<CreateUserResult> = {
          message: 'Error: User Already Exist. Please Login',
          status: 'error',
        };
        return res;
      }

      await this.sendCodeAsync(user.email, url);

      user.password = await bcrypt.hash(user.password, 10);

      const userModel: User = {
        email: user.email,
        name: user.name,
        password: user.password,
        role: 'Cliente',
        emailVerified: false,
      };

      const result = await UserModel.create(userModel);
      const res: RepositoryResponse<CreateUserResult> = {
        message: 'User registered successfully.',
        model: {
          email: result.email,
          name: result.name,
          role: result.role,
        },
        status: 'success',
      };

      await emailService.sendEmailToVerificationEmail(
        user.email,
        `http://${url}/verifyemail?id=${hashVerify}`,
      );

      return res;
    } catch (err) {
      const res: RepositoryResponse<User> = {
        error: err,
        status: 'error',
      };
      return res;
    }
  }

  async login(login: LoginDto): Promise<RepositoryResponse<TokenPayload>> {
    const userRes = await UserModel.findOne<User>({ email: login.email });

    if (userRes) {
      const isEqual = bcrypt.compareSync(login.password, userRes.password);
      if (!isEqual) {
        const error: RepositoryResponse<TokenPayload> = {
          message: 'Usuário ou a senha estão errados.',
          status: 'error',
        };
        return error;
      }
      const userResult: TokenPayload = {
        name: userRes.name,
        email: userRes.email,
        photoUrl: userRes.photoUrl,
        role: userRes.role,
        emailIsValid: userRes.emailVerified,
        token: '',
      };

      const secret = process.env.JWT_SECRET as string;
      userResult.token = jwt.sign(userResult, secret as string, {
        expiresIn: '20d',
      });
      const res: RepositoryResponse<TokenPayload> = {
        message: 'User registered successfully.',
        model: userResult,
        status: 'success',
      };
      return res;
    }
    const error: RepositoryResponse<TokenPayload> = {
      message: 'Usuário ou a senha estão errados.',
      status: 'error',
    };
    return error;
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<RepositoryResponse<TokenPayload>> {
    try {
      const userRes = await UserModel.findOne<User>({
        email: changePasswordDto.email,
      });

      if (userRes) {
        const isValid = bcrypt.compareSync(
          changePasswordDto.oldPassword,
          userRes.password,
        );
        if (!isValid) {
          const error: RepositoryResponse<TokenPayload> = {
            message: 'A senha anterior foi informada errada.',
            status: 'error',
          };
          return error;
        }

        changePasswordDto.confirmPassword = await bcrypt.hash(
          changePasswordDto.confirmPassword,
          10,
        );

        const isEqual = bcrypt.compareSync(
          changePasswordDto.newPassword,
          changePasswordDto.confirmPassword,
        );
        if (!isEqual) {
          const res: RepositoryResponse<TokenPayload> = {
            error: 'Senha e confirmação de senha são diferentes.',
            status: 'error',
          };
          return res;
        }

        userRes.password = changePasswordDto.confirmPassword;

        await UserModel.findByIdAndUpdate({ _id: userRes.id }, userRes);
        const res: RepositoryResponse<TokenPayload> = {
          error: 'Senha alterada com sucesso.',
          status: 'success',
        };
        return res;
      }
      const res: RepositoryResponse<TokenPayload> = {
        error: 'Ocorreu um erro de request.',
        status: 'error',
      };
      return res;
    } catch {
      const res: RepositoryResponse<TokenPayload> = {
        error: 'Senha e confirmação de senha são diferentes.',
        status: 'error',
      };
      return res;
    }
  }

  async verifyEmail(token: string): Promise<RepositoryResponse<TokenPayload>> {
    try {
      const secret = process.env.JWT_SECRET as string;
      const user = jwt.verify(token, secret) as JwtPayload;

      if (user) {
        const userRes = (await UserModel.findOne<User>({
          email: user.email,
        })) as User;
        userRes.emailVerified = true;
        await UserModel.findByIdAndUpdate(
          { _id: userRes?.id },
          userRes as User,
        );
        const res: RepositoryResponse<TokenPayload> = {
          message:
            'Que legal. Seu e-mail foi validado com sucesso. A partir de agora você poderá utilizar o Mega Sorte',
          status: 'success',
        };
        return res;
      }
      const res: RepositoryResponse<TokenPayload> = {
        message: 'Erro de servidor.',
        status: 'error',
      };
      return res;
    } catch (error) {
      const res: RepositoryResponse<TokenPayload> = {
        error: error,
        status: 'error',
      };
      return res;
    }
  }

  async sendCodeAsync(
    email: string,
    url: string,
  ): Promise<RepositoryResponse<TokenPayload>> {
    const user = await UserModel.findOne<User>({ email });
    if (user && !user.emailVerified) {
      const hashEmail = await bcrypt.hash(email, 10);

      const secret = process.env.JWT_SECRET as string;
      const hashVerify = jwt.sign(hashEmail, secret as string, {
        expiresIn: '2d',
      });

      await emailService.sendEmailToVerificationEmail(
        email,
        `http://${url}/verifyemail?id=${hashVerify}`,
      );
      const res: RepositoryResponse<TokenPayload> = {
        message: 'E-mail de validação enviado com sucesso.',
        status: 'success',
      };
      return res;
    }
    if (user.emailVerified) {
      const res: RepositoryResponse<TokenPayload> = {
        message: 'Usuário com e-mail já verificado.',
        status: 'error',
      };
      return res;
    }
    const res: RepositoryResponse<TokenPayload> = {
      message: 'Usuário não encontrado.',
      status: 'error',
    };
    return res;
  }
}

export default new AuthRepository();
