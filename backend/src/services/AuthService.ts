import { UserRepository } from '../repositories/UserRepository';
import { LoginUserDto } from '../dtos/user/LoginUserDto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_segura';

export class AuthService {
  static async login(data: LoginUserDto) {
    const user = await UserRepository.search(data.email);

    if (!user) {
      throw new Error('E-mail ou senha inválidos');
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error('E-mail ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }
}
