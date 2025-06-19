import { UserRepository } from '../repositories/UserRepository';
import { LoginUserDto } from '../dtos/user/LoginUserDto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_segura';

export class AuthService {
  static async login(data: LoginUserDto) {
    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('E-mail ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error('E-mail ou senha inválidos');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    return {
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
