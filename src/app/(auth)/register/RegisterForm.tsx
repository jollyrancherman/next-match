'use client';

import { registerUser } from '@/app/action/authActions';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    console.log({ result });

    if (result.status === 'success') {
      console.log('User registered success');
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path.join('.') as 'email' | 'name' | 'password';
          setError(fieldName, { message: e.message });
        });
      } else {
        setError('root.serverError', { message: result.error });
      }
    }
  };

  return (
    <Card className='max-w-lg min-w-96 mx-auto'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary'>
          <div className='flex items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Register</h1>
          </div>
          <p className='text-neutral-500'>Welcome to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              defaultValue=''
              label='Name'
              variant='bordered'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
            <Input
              defaultValue=''
              label='Email'
              variant='bordered'
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=''
              label='Password'
              variant='bordered'
              type='password'
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            {errors.root?.serverError && (
              <p className='text-danger text-sm'>
                {errors.root?.serverError.message}
              </p>
            )}
            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              fullWidth
              color='secondary'
              type='submit'
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
