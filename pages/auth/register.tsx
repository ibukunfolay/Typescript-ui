import React from 'react';
import { object, string } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface IFormInput {
  username: String;
  email: String;
  password: String;
  passwordConfirmation: String;
}

export const createUserSchema = object({
  email: string({
    required_error: 'Email is required',
  }).email({ message: 'invalid email' }),
  username: string().min(1, 'Name is required'),
  password: string({
    required_error: 'Password is required',
  }).min(6, 'password must be more than six characters'),
  passwordConfirmation: string().min(1, {
    message: 'Confirm Password is required',
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['password confirmation'],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log({ errors });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-element">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            className="email"
            placeholder="enter you email"
            {...register('email')}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="username" className="">
            Username
          </label>
          <input
            type="text"
            className="username"
            placeholder="enter you username"
            {...register('username')}
          />
          {errors.username && <p>{errors.username?.message}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            className="password"
            placeholder="*********"
            {...register('password')}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <div className="form-element">
          <label htmlFor="passwordConfirmation" className="">
            Confirm Password
          </label>
          <input
            type="password"
            className="password"
            placeholder="*********"
            {...register('passwordConfirmation')}
          />
          {errors.passwordConfirmation && (
            <p>{errors.passwordConfirmation?.message}</p>
          )}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
