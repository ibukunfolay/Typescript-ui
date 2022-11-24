import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  createSessionInput,
  createSessionSchema,
} from '../../lib/schema/userInput';

const Login = () => {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const onSubmit = handleSubmit(async (data: createSessionInput) => {
    try {
      await axios.post(`${BASE_URL}/api/sessions`, data);
      router.push('/');
    } catch (e: any) {
      setLoginError(e.message);
    }
  });

  return (
    <>
      <p>{loginError}</p>
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
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
