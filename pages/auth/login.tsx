import React from 'react';

const login = () => {
  return (
    <>
      <form action="">
        <div className="form-element">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="text"
            className="email"
            placeholder="enter you email"
            {...register('email')}
          />
        </div>
      </form>
    </>
  );
};

export default login;
