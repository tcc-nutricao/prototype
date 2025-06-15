import { Request, Response, NextFunction } from 'express';
import { LoginUserSchema } from '../dtos/user/LoginUserDto';
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = LoginUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.errors });
      }

      const result = await AuthService.login(parsed.data);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
