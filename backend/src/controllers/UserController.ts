import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { filters, limit, page, order } = req.body;
            const { data, total } = await UserService.search(filters, limit, page, order);
            
            return res.status(200).json({ data, total });
        } catch (err) {
            next(err);
        }
    }

    static async insert(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.insert(req.body);
            return res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({
                    errors: [{ message: 'ID não informado.' }]
                });
            }

            const user = await UserService.update(id, updateData);
            return res.status(200).json(user); 
        } catch (err) {
            next(err);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: [{ message: 'ID não informado.' }]
                });
            }

            const deletedUser = await UserService.remove(Number(id));

            if (!deletedUser) {
                return res.status(404).json({
                    errors: [{ message: 'Usuário não encontrado.' }]
                });
            }

            return res.status(200).json({ message: 'Usuário removido com sucesso.' });
        } catch (err) {
            next(err);
        }
    }




    


  // outros métodos: getAll, update, remove
}
