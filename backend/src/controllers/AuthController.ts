import { Request, Response, NextFunction } from 'express';
import { LoginUserSchema } from '../dtos/user/LoginUserDto';
import { AuthService } from '../services/AuthService';
import { formatZodErrors } from '../utils/formatZodErrors';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
       const parsedResult = LoginUserSchema.safeParse(req.body);
      
      if (!parsedResult.success) {
          const errors = formatZodErrors(parsedResult.error);
          return res.status(422).json({ error: true, data: errors });
      }

      const result = await AuthService.login(parsedResult.data);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
