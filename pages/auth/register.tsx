import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserInput, createUserSchema } from '../../lib/schema/userInput';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: createUserInput) => {
    try {
      await axios.post(`${BASE_URL}/api/users`, data);
      router.push('/');
    } catch (e: any) {
      setRegisterError(e.message);
    }
  };

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="name" className="">
            Name
          </label>
          <input
            type="text"
            className="name"
            placeholder="enter you name"
            {...register('name')}
          />
          {errors.name && <p>{errors.name?.message}</p>}
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
