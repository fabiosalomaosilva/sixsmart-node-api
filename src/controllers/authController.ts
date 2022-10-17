import { Request, Response } from 'express';

import {
  ChangePasswordDto,
  LoginDto,
  UserCreateDto,
} from '../dto/userCreateDto';
import authService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response) {
    const user: UserCreateDto = req.body;
    const url = req.get('host') as string;
    const userResult = await authService.register(user, url);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult);
    } else {
      return res.status(500).json(userResult);
    }
  }

  async login(req: Request, res: Response) {
    const user: LoginDto = req.body;
    const userResult = await authService.login(user);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.model);
    } else {
      return res.status(500).json(userResult);
    }
  }

  async changePassword(req: Request, res: Response) {
    const changePasswordDto: ChangePasswordDto = req.body;
    const userResult = await authService.changePassword(changePasswordDto);
    if (userResult.status === 'success') {
      return res.status(200).json(userResult.message);
    } else {
      return res.status(500).json(userResult);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const token = req.query.id as string;
    if (token) {
      const userResult = await authService.verifyEmail(token);
      if (userResult.status === 'success') {
        return res.status(200).send(`
          <h1>${userResult.message}</h1>
        `);
      } else {
        return res.status(500).json(userResult);
      }
    }
  }
}

export default new AuthController();
