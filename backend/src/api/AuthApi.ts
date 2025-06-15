import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/AuthController';

export const login = (req: Request, res: Response, next: NextFunction) =>
  AuthController.login(req, res, next);
