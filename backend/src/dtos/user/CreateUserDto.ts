import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  role: z.enum(['STANDARD', 'PROFESSIONAL'], {
    required_error: 'Tipo de usuário é obrigatório',
    invalid_type_error: 'Tipo de usuário inválido',
  }),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
