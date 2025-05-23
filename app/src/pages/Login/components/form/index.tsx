import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { MailIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  loginFormSchema,
  LoginFormSchema,
} from '../../validations/login.form.schema';

import { InputCustom } from '@/components/common/Inputs/InputCustom';
import { PasswordInput } from '@/components/common/Inputs/PasswordInput';
import { Endpoints } from '@/constants/frontend/endpoints';
import { useAuthentication } from '@/providers/Authentication.provider';
import { auth } from '@/services/api';
import { login } from '@/services/auth/login';
import { TCredentials } from '@/types/TCredentials';

export function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setIsLoading } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' } as TCredentials,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess() {
      setUser(auth.currentUser);

      navigate(Endpoints.dashboard);
    },
    onError() {
      addToast({
        title: 'Senha ou e-mail inválidos',
        color: 'danger',
      });
    },
  });

  const onHandleSubmit = handleSubmit((credentials: TCredentials) => {
    setIsLoading(true);
    mutate(credentials);
    setIsLoading(false);
  });

  return (
    <form onSubmit={onHandleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <InputCustom
            {...register('email')}
            isRequired
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="E-mail"
            placeholder="Digite seu email"
            startContent={<MailIcon className="w-6 h-6 text-gray-600" />}
            type="email"
          />
          <PasswordInput
            {...register('password')}
            isRequired
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            label="Senha"
            placeholder="Digite sua senha"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="w-1/2 text-lg font-semibold shadow-md shadow-primary/60"
            color="primary"
            isLoading={isPending}
            type="submit"
            variant="solid"
          >
            Entrar
          </Button>
        </div>
      </div>
    </form>
  );
}
