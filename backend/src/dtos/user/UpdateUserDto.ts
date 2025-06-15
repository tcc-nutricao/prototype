import { z } from 'zod';

export const UpdateUserSchema = z.object({
  id: z.number({
    required_error: 'ID é obrigatório para atualização',
    invalid_type_error: 'ID deve ser um número',
  }),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
