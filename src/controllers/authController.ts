import { Request, Response } from 'express';

import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  LoginSocialDto,
  UserCreateDto,
} from '../dto/userCreateDto';
import authService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response) {
    console.log(req.body);
    const user: UserCreateDto = req.body;
    const url = req.get('host') as string;
    const userResult = await authService.register(user, url);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult);
    } else {
      return res.status(400).json(userResult);
    }
  }

  async login(req: Request, res: Response) {
    const user: LoginDto = req.body;
    const userResult = await authService.login(user);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.model);
    } else {
      return res.status(400).json(userResult);
    }
  }

  async loginSocial(req: Request, res: Response) {
    const user: LoginSocialDto = req.body;
    const userResult = await authService.loginSocial(user);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.model);
    } else {
      return res.status(400).json(userResult);
    }
  }

  async existsUser(req: Request, res: Response) {
    const email = req.query.email as string;
    console.log(email);
    if (email != null || email != undefined) {
      const userResult = await authService.existsUser(email);
      console.log(userResult);
      if (userResult) {
        return res.status(200).json({
          message: 'Usuário cadastrado.',
          status: 'success',
        });
      } else {
        return res.status(400).json({
          message: 'Usuário não cadastrado.',
          status: 'error',
        });
      }
    }
    return res.status(400).send({
      message: 'E-mail não enviado.',
      status: 'error',
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const forgotPasswordDto: ForgotPasswordDto = req.body;
    const userResult = await authService.forgotPassword(forgotPasswordDto);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.model);
    } else {
      return res.status(400).json(userResult);
    }
  }

  async changePassword(req: Request, res: Response) {
    const changePasswordDto: ChangePasswordDto = req.body;
    const userResult = await authService.changePassword(changePasswordDto);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.message);
    } else {
      return res.status(400).json(userResult);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const token = req.query.id as string;
    if (token) {
      const userResult = await authService.verifyEmail(token);
      if (userResult.status === 'success') {
        return res.status(200).send(`
          <div style="width:100%; height: 100vh; justify-content: center;padding-top: 120px;background-color: #f5f5f5;font-family: sans-serif;">
            <div style="text-align: center;margin-left: 50px;margin-right: 50px;">
                  <h1>Mega Sorte</h1>
              <h2>${userResult.message}</h2>
            </div>
          </div>
        `);
      } else {
        return res.status(400).json(userResult);
      }
    }
  }

  async reSendCode(req: Request, res: Response) {
    const { email } = req.body;
    const url = req.get('host') as string;
    const userResult = await authService.sendCode(email, url);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult);
    } else {
      return res.status(400).json(userResult);
    }
  }
}

export default new AuthController();
