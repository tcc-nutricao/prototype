import { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

export const insert = (req: Request, res: Response, next: NextFunction) => {
  UserController.insert(req, res, next).catch(next);
};

export const search = (req: Request, res: Response, next: NextFunction) => {
  UserController.search(req, res, next).catch(next);
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  UserController.update(req, res, next).catch(next);
};

export const remove = (req: Request, res: Response, next: NextFunction) => {
  UserController.remove(req, res, next).catch(next);
};

